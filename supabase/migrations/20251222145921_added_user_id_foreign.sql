alter table "public"."Account" add column "user_id" uuid not null;

alter table "public"."Account" add constraint "Account_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Account" validate constraint "Account_user_id_fkey";


