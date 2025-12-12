import { listMyDocuments } from "./queries/list-documents";
import { createDocument } from "./mutations/create-document";

export const documentRouter = {
  listMy: listMyDocuments,
  create: createDocument,
};

