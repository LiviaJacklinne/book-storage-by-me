/*
  Warnings:

  - You are about to drop the `Livro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Livro";

-- CreateTable
CREATE TABLE "livro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "anoPublicacao" INTEGER,
    "genero" "GeneroEnum" NOT NULL,
    "qtdDisponivel" INTEGER NOT NULL,

    CONSTRAINT "livro_pkey" PRIMARY KEY ("id")
);
