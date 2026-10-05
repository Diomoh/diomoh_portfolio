import { redirect } from "next/navigation";

// Adresses non interceptées par le proxy (ex. /fr/page.php) : retour à l'accueil de la langue.
export default async function CatchAll({ params }: PageProps<"/[lang]/[...rest]">) {
  const { lang } = await params;
  redirect(`/${lang}`);
}
