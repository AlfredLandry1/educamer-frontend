"use client";
import LandingNavbar from "@/components/Landing/LandingNavbar";
import LandingFooter from "@/components/Landing/LandingFooter";

export default function PrivacyPage() {
  return (
    <>
      <LandingNavbar />
      <main className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4 py-16">
        <section className="w-full max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Politique de confidentialité</h1>
          <p className="text-gray-600 mb-8">
            Chez Educamer, la protection de votre vie privée et de vos données personnelles est une priorité absolue. Cette politique de confidentialité vise à vous expliquer en toute transparence quelles informations nous collectons, pourquoi nous les collectons, comment nous les utilisons, et quels sont vos droits et choix concernant vos données.
          </p>
          <div className="prose prose-primary text-gray-800">
            <h2>1. Introduction</h2>
            <p>
              Educamer propose des services éducatifs innovants accessibles en ligne. En utilisant nos services, vous nous confiez des informations précieuses. Nous nous engageons à les protéger et à vous donner le contrôle sur vos données.
            </p>

            <h2>2. Informations collectées</h2>
            <p>
              Nous collectons différentes catégories d’informations pour assurer le bon fonctionnement de la plateforme et améliorer votre expérience :
            </p>
            <ul>
              <li><b>Informations que vous fournissez :</b> lors de la création de compte, de l’utilisation des services (nom, prénom, email, mot de passe, photo de profil, etc.).</li>
              <li><b>Contenus créés :</b> messages, commentaires, documents, devoirs, etc.</li>
              <li><b>Données techniques :</b> informations sur l’appareil, le navigateur, l’adresse IP, les cookies, les logs de connexion.</li>
              <li><b>Informations d’utilisation :</b> progression, interactions avec les cours, préférences, statistiques d’utilisation.</li>
            </ul>

            <h2>3. Utilisation des informations</h2>
            <p>Nous utilisons vos données pour :</p>
            <ul>
              <li>Fournir, personnaliser et améliorer nos services ;</li>
              <li>Assurer la sécurité et la fiabilité de la plateforme ;</li>
              <li>Communiquer avec vous (notifications, support, informations importantes) ;</li>
              <li>Respecter nos obligations légales et réglementaires.</li>
            </ul>

            <h2>4. Partage des informations</h2>
            <p>
              Nous ne partageons jamais vos données personnelles avec des tiers à des fins commerciales sans votre consentement explicite. Certains partenaires techniques (hébergement, sécurité, analytics) peuvent accéder à certaines données uniquement pour le compte d’Educamer et dans le respect de cette politique.
            </p>

            <h2>5. Sécurité et confidentialité</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité avancées pour protéger vos données contre tout accès, modification, divulgation ou destruction non autorisés : chiffrement, contrôle d’accès strict, audits réguliers, sauvegardes sécurisées.
            </p>

            <h2>6. Vos droits et choix</h2>
            <p>
              Vous disposez de droits sur vos données : accès, rectification, suppression, portabilité, limitation et opposition. Vous pouvez gérer vos préférences depuis votre compte ou nous contacter à <a href="mailto:privacy@educamer.com">privacy@educamer.com</a>.
            </p>

            <h2>7. Conservation des données</h2>
            <p>
              Nous conservons vos données uniquement le temps nécessaire à la fourniture des services et au respect de nos obligations légales. Vous pouvez demander la suppression de votre compte et de vos données à tout moment.
            </p>

            <h2>8. Gestion des préférences et cookies</h2>
            <p>
              Vous pouvez gérer vos préférences de confidentialité et l’utilisation des cookies via les paramètres de votre navigateur ou de votre compte. Certains cookies sont essentiels au fonctionnement de la plateforme.
            </p>

            <h2>9. Conformité et coopération</h2>
            <p>
              Educamer s’engage à respecter la réglementation applicable en matière de protection des données (RGPD, etc.) et à coopérer avec les autorités compétentes en cas de besoin.
            </p>

            <h2>10. Modifications de la politique</h2>
            <p>
              Cette politique de confidentialité peut être mise à jour pour refléter l’évolution de nos pratiques ou de la législation. Toute modification substantielle sera notifiée sur la plateforme. Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>

            <h2>11. Contact</h2>
            <p>
              Pour toute question ou demande concernant vos données personnelles, contactez-nous à <a href="mailto:privacy@educamer.com">privacy@educamer.com</a>.
            </p>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
} 