import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import SeoContent from "@/components/SeoContent";
import StatusSection from "@/components/StatusSection";

const Estado = () => (
  <SiteLayout>
    <Seo
      title="Estado en vivo de los servidores Warborn | Arma Reforger"
      description="Consulta en tiempo real el estado, jugadores online y disponibilidad de los servidores Warborn de Arma Reforger España."
      path="/estado"
    />
    <div className="pt-24">
      <SeoBreadcrumbs items={[{ name: "Estado", path: "/estado" }]} />
      <StatusSection />
      <SeoContent
        h1="Estado en vivo de los servidores Warborn"
        intro="Monitoriza en tiempo real los servidores Warborn de Arma Reforger: jugadores conectados, ping, mapa actual y estado online/offline. Los datos provienen directamente de BattleMetrics y se actualizan automáticamente."
      />
    </div>
  </SiteLayout>
);

export default Estado;