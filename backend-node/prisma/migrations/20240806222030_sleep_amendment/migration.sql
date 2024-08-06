/*
  Warnings:

  - You are about to alter the column `sleepDuration` on the `Sleep` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sleep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sleepDuration" REAL NOT NULL,
    "sleptAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Sleep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sleep" ("createdAt", "id", "sleepDuration", "sleptAt", "updatedAt", "userId") SELECT "createdAt", "id", "sleepDuration", "sleptAt", "updatedAt", "userId" FROM "Sleep";
DROP TABLE "Sleep";
ALTER TABLE "new_Sleep" RENAME TO "Sleep";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
