/*
  Warnings:

  - Added the required column usuarioId to the Pedido table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "canalPedido" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Pedido_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Pedido" ("id", "usuarioId", "canalPedido", "createdAt", "status", "total") SELECT "id", 1, "canalPedido", "createdAt", "status", "total" FROM "Pedido";
DROP TABLE "Pedido";
ALTER TABLE "new_Pedido" RENAME TO "Pedido";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
