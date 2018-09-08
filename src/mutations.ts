import { Prisma } from "prisma-binding";

export const Mutation = {
    addFather: (_, args, context, info) => {
        return context.prisma.mutation.updateHuman(
            {
                data: {
                    human: {
                        connect: {
                            id: args.fatherId
                        }
                    }
                },
                where: {
                    id: args.childId
                }
            },
            info
        );
    },
    createHuman: (_, args, context: { prisma: Prisma }, info) => {
        return context.prisma.mutation.createHuman({ args }, info);
    }
};
