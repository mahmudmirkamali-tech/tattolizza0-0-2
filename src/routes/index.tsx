import { createFileRoute } from "@tanstack/react-router";
import { AtelierClient } from "@/atelier/Client";

export const Route = createFileRoute("/")({ component: AtelierClient });
