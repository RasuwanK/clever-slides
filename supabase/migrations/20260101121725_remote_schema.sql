alter table "public"."Presentation" drop column "title";

alter table "public"."Presentation" add constraint "Presentation_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Account"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Presentation" validate constraint "Presentation_created_by_fkey";


  create policy "Enable insert for users based on user_id"
  on "public"."Presentation"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = created_by));



  create policy "Enable read access for all users"
  on "public"."Presentation"
  as permissive
  for select
  to public
using (true);



  create policy "Update own records"
  on "public"."Presentation"
  as permissive
  for update
  to authenticated
using ((created_by = auth.uid()))
with check ((created_by = auth.uid()));



