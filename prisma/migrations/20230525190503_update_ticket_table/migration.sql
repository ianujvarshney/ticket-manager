-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipient" TEXT NOT NULL,
    "expiry_date" DATETIME NOT NULL,
    "document_number" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "payment_place" TEXT NOT NULL,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ticket" ("created_at", "document_number", "expiry_date", "id", "is_paid", "payment_place", "recipient", "updated_at", "userId", "value") SELECT "created_at", "document_number", "expiry_date", "id", "is_paid", "payment_place", "recipient", "updated_at", "userId", "value" FROM "Ticket";
DROP TABLE "Ticket";
ALTER TABLE "new_Ticket" RENAME TO "Ticket";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
