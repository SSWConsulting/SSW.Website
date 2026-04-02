import { OldConsultingPage } from "@/app/consulting/[filename]/consulting";
import getConsultingPageMetadata from "@/helpers/consulting";

export async function POST(request: Request) {
  const body = await request.json();
  const data = body as OldConsultingPage;

  const response = await getConsultingPageMetadata(data);
  return new Response(JSON.stringify({ ...response }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
