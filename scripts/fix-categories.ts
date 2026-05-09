import { prisma } from "../src/lib/prisma";

async function fixCategories() {
  console.log("1. Normalizando todos los nombres a minúsculas...");
  
  const categories = await prisma.category.findMany();
  
  for (const cat of categories) {
    const normalized = cat.name.toLowerCase();
    if (cat.name !== normalized) {
      await prisma.category.update({
        where: { id: cat.id },
        data: { name: normalized }
      });
      console.log(`   Actualizado: ${cat.name} -> ${normalized}`);
    }
  }

  console.log("\n2. Eliminando duplicados (dejando solo el primero)...");
  
  const allCategories = await prisma.category.findMany({
    orderBy: { id: 'asc' }
  });
  
  const seen = new Set<string>();
  
  for (const cat of allCategories) {
    const key = `${cat.name.toLowerCase()}-${cat.parentId || 'null'}`;
    
    if (seen.has(key)) {
      console.log(`   Eliminando duplicado: ${cat.name} (parentId: ${cat.parentId})`);
      await prisma.category.delete({ where: { id: cat.id } });
    } else {
      seen.add(key);
    }
  }

  console.log("\n✅ Categorías normalizadas y duplicados eliminados!");
  
  const remaining = await prisma.category.findMany();
  console.log("\nCategorías restantes:");
  remaining.forEach(cat => {
    console.log(`   ID: ${cat.id}, Name: ${cat.name}, ParentId: ${cat.parentId}`);
  });
}

fixCategories()
  .catch(console.error)
  .finally(() => process.exit());