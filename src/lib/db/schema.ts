import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const roleEnum = pgEnum("role", ["guest", "user", "pro", "admin"]);
export const mockupTypeEnum = pgEnum("mockup_type", ["scene", "screen"]);
export const presetCategoryEnum = pgEnum("preset_category", [
  "wallpaper",
  "desk",
  "background",
]);
export const feedbackTypeEnum = pgEnum("feedback_type", [
  "bug",
  "suggestion",
  "other",
]);
export const feedbackStatusEnum = pgEnum("feedback_status", [
  "open",
  "reviewed",
  "closed",
]);

// Users (extended from Better Auth)
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: roleEnum("role").notNull().default("user"),
  banned: boolean("banned").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Better Auth sessions
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

// Better Auth accounts
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Better Auth verifications
export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Mockups
export const mockups = pgTable("mockups", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: mockupTypeEnum("type").notNull(),
  title: text("title"),
  config: jsonb("config").notNull().default({}),
  thumbnailUrl: text("thumbnail_url"),
  isPublic: boolean("is_public").notNull().default(false),
  shareSlug: text("share_slug").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Presets (admin managed)
export const presets = pgTable("presets", {
  id: text("id").primaryKey(),
  category: presetCategoryEnum("category").notNull(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Feedback
export const feedback = pgTable("feedback", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  message: text("message").notNull(),
  type: feedbackTypeEnum("type").notNull().default("other"),
  status: feedbackStatusEnum("status").notNull().default("open"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Mockup = typeof mockups.$inferSelect;
export type NewMockup = typeof mockups.$inferInsert;
export type Preset = typeof presets.$inferSelect;
export type Feedback = typeof feedback.$inferSelect;

// Subscription status enum
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "cancelled",
  "expired",
  "paused",
  "past_due",
]);

// Lemon Squeezy subscriptions
export const subscriptions = pgTable("subscriptions", {
  id:                 text("id").primaryKey(),
  userId:             text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  lsSubscriptionId:   text("ls_subscription_id").notNull().unique(),
  lsCustomerId:       text("ls_customer_id").notNull(),
  lsVariantId:        text("ls_variant_id"),
  status:             subscriptionStatusEnum("status").notNull().default("active"),
  currentPeriodEnd:   timestamp("current_period_end"),
  cancelledAt:        timestamp("cancelled_at"),
  createdAt:          timestamp("created_at").notNull().defaultNow(),
  updatedAt:          timestamp("updated_at").notNull().defaultNow(),
});

export type Subscription = typeof subscriptions.$inferSelect;
