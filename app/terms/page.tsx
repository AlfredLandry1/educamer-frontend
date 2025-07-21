"use client";
import LandingNavbar from "@/components/Landing/LandingNavbar";
import LandingFooter from "@/components/Landing/LandingFooter";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <LandingNavbar />
      <main className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4 py-16">
        <section className="w-full max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Conditions Générales d’Utilisation</h1>
          <p className="text-gray-600 mb-8">Bienvenue sur Educamer. Veuillez lire attentivement ces conditions qui régissent l’accès et l’utilisation de la plateforme.</p>
          <div className="prose prose-primary text-gray-800">
            <h2 id="objet">1. Objet et acceptation des CGU</h2>
            <p>En accédant à la plateforme Educamer, vous acceptez sans réserve les présentes Conditions Générales d’Utilisation (CGU). Si vous n’acceptez pas tout ou partie des CGU, veuillez ne pas utiliser nos services.</p>
            <h2 id="editeur">2. Qui sommes-nous ?</h2>
            <p>Educamer est une plateforme éducative en ligne, éditée par [Nom de la société], dont le siège social est situé à [adresse], immatriculée sous le numéro [SIREN/SIRET].</p>
            <h2 id="acces">3. Accès et inscription</h2>
            <ul>
              <li>L’accès à certains services nécessite la création d’un compte utilisateur (élève, parent, enseignant, admin).</li>
              <li>Vous vous engagez à fournir des informations exactes, à jour et complètes lors de l’inscription.</li>
              <li>L’accès est réservé aux personnes majeures ou aux mineurs disposant de l’autorisation de leur représentant légal.</li>
            </ul>
            <h2 id="utilisation">4. Utilisation des services</h2>
            <ul>
              <li>Vous vous engagez à utiliser la plateforme dans le respect des lois en vigueur, de la sécurité et du respect d’autrui.</li>
              <li>Il est interdit de :
                <ul>
                  <li>Usurper l’identité d’autrui</li>
                  <li>Diffuser des contenus illicites, violents, haineux, discriminatoires ou portant atteinte à la vie privée</li>
                  <li>Perturber le bon fonctionnement du service (spam, piratage, etc.)</li>
                </ul>
              </li>
            </ul>
            <h2 id="propriete">5. Propriété intellectuelle</h2>
            <ul>
              <li>Tous les contenus (textes, images, vidéos, logos, code, etc.) présents sur Educamer sont protégés par le droit d’auteur et restent la propriété exclusive d’Educamer ou de ses partenaires.</li>
              <li>Vous conservez la propriété des contenus que vous publiez, mais vous accordez à Educamer une licence mondiale, non exclusive et gratuite pour les héberger, afficher et améliorer le service.</li>
            </ul>
            <h2 id="confidentialite">6. Données personnelles et confidentialité</h2>
            <ul>
              <li>La collecte et le traitement de vos données sont détaillés dans notre <Link href="/privacy">Politique de Confidentialité</Link>.</li>
              <li>Vous disposez de droits d’accès, de rectification, de suppression et de portabilité de vos données.</li>
              <li>Educamer s’engage à protéger vos données et à ne jamais les vendre à des tiers sans consentement.</li>
            </ul>
            <h2 id="securite">7. Sécurité</h2>
            <ul>
              <li>Educamer met en œuvre des mesures de sécurité avancées pour protéger vos données et votre compte.</li>
              <li>Vous êtes responsable de la confidentialité de votre mot de passe et de toute activité liée à votre compte.</li>
            </ul>
            <h2 id="responsabilite">8. Responsabilités</h2>
            <ul>
              <li>Educamer s’efforce d’assurer la disponibilité et la fiabilité du service, mais ne peut garantir une absence totale d’erreur ou d’interruption.</li>
              <li>Educamer ne saurait être tenu responsable des contenus publiés par les utilisateurs ou des dommages indirects liés à l’utilisation du service.</li>
            </ul>
            <h2 id="suspension">9. Suspension et résiliation</h2>
            <ul>
              <li>En cas de non-respect des CGU, Educamer se réserve le droit de suspendre ou supprimer votre compte, sans préavis.</li>
              <li>Vous pouvez à tout moment supprimer votre compte depuis votre espace personnel.</li>
            </ul>
            <h2 id="modification">10. Modifications des CGU</h2>
            <ul>
              <li>Educamer peut modifier les présentes CGU à tout moment. Vous serez informé de toute modification importante.</li>
              <li>L’utilisation continue du service après modification vaut acceptation des nouvelles CGU.</li>
            </ul>
            <h2 id="loi">11. Loi applicable et litiges</h2>
            <ul>
              <li>Les présentes CGU sont soumises au droit français.</li>
              <li>En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux compétents seront ceux du siège d’Educamer.</li>
            </ul>
            <h2 id="contact">12. Contact</h2>
            <p>Pour toute question ou réclamation concernant les CGU, contactez-nous à : <a href="mailto:contact@educamer.com">contact@educamer.com</a></p>
            <p className="text-xs text-gray-400 mt-8">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
} 