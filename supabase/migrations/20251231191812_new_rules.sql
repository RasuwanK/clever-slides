alter table "public"."Presentation" drop column "title";

alter table "public"."Presentation" add constraint "Presentation_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public."Account"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Presentation" validate constraint "Presentation_created_by_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public."Account" (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$function$
;


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



