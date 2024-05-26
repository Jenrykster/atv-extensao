-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "ownerGoogleId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "upvote" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
