import { integer, pgTable, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
export * from "./auth-schema";
import { user } from "./auth-schema";

export const userRoleEnum = pgEnum("user_role", ["admin", "medical_staff", "company_admin", "employee"]);
export const requestStatusEnum = pgEnum("request_status", ["pending", "accepted", "rejected", "dismissed"]);
export const bookingStatusEnum = pgEnum("booking_status", ["scheduled", "completed", "cancelled"]);

export const medicalCompaniesTable = pgTable("medical_companies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  address: varchar({ length: 500 }),
  postalCode: varchar({ length: 10 }),
  city: varchar({ length: 255 }),
  phone: varchar({ length: 20 }),
  email: varchar({ length: 255 }),
  website: varchar({ length: 255 }),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const clientCompaniesTable = pgTable("client_companies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  siret: varchar({ length: 14 }),
  address: varchar({ length: 500 }),
  postalCode: varchar({ length: 10 }),
  city: varchar({ length: 255 }),
  sector: varchar({ length: 255 }),
  employeeCount: integer(),
  medicalCompanyId: integer().references(() => medicalCompaniesTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const employeesTable = pgTable("employees", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  clientCompanyId: integer().references(() => clientCompaniesTable.id).notNull(),
  role: userRoleEnum().notNull().default("employee"),
  position: varchar({ length: 255 }),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const membershipRequestsTable = pgTable("membership_requests", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clientCompanyId: integer().references(() => clientCompaniesTable.id).notNull(),
  medicalCompanyId: integer().references(() => medicalCompaniesTable.id).notNull(),
  status: requestStatusEnum().notNull().default("pending"),
  message: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const bookingsTable = pgTable("bookings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  employeeId: integer().references(() => employeesTable.id).notNull(),
  medicalCompanyId: integer().references(() => medicalCompaniesTable.id).notNull(),
  scheduledAt: timestamp().notNull(),
  status: bookingStatusEnum().notNull().default("scheduled"),
  notes: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const documentsTable = pgTable("documents", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  employeeId: integer().references(() => employeesTable.id).notNull(),
  name: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 100 }),
  url: varchar({ length: 500 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const employeesRelations = relations(employeesTable, ({ one }) => ({
  user: one(user, {
    fields: [employeesTable.userId],
    references: [user.id],
  }),
  clientCompany: one(clientCompaniesTable, {
    fields: [employeesTable.clientCompanyId],
    references: [clientCompaniesTable.id],
  }),
}));
