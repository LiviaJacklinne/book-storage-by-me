-- CreateEnum
CREATE TYPE "GeneroEnum" AS ENUM ('FICCAO', 'ROMANCE', 'TERROR', 'FANTASIA', 'BIOGRAFIA');

-- CreateTable
CREATE TABLE "Livro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "anoPublicacao" INTEGER,
    "genero" "GeneroEnum" NOT NULL,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);
