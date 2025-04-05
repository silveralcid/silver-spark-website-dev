import { ClientLogos } from "@/components/sections/clients/client-logos"
import { clientLogos } from "@/lib/data/client-data"

export function ClientsSection() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <ClientLogos logos={clientLogos} />
    </section>
  )
}

