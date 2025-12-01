import { Button } from "@/components/ui/button";
import { CONFIG } from "@/configs/config";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
    return (
        <div className="w-full md:min-h-[400px] relative py-12 px-4 flex flex-col items-center justify-center text-center">
            <div
                className="absolute inset-0 -z-1"
                style={{
                    backgroundImage: `
        radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
        radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
      `,
                }}
            />
            <h2 className="text-4xl font-semibold mb-6">Join us at the Inudstry Conclave</h2>
            <p className="text-md">Fill out the form to book your spot. Join us on 5th and 6th of December.</p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md justify-center">
                <Button asChild className="w-full sm:w-auto">
                    <Link href={"/register"} className="flex gap-2 items-center justify-center">
                        Register now
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>
                <Button variant={"outline"} asChild className="w-full sm:w-auto">
                    <Link href={CONFIG.brochureLink} target="_blank" className="flex items-center gap-2">Get Brochure <ArrowUpRight className="w-4 h-4" /></Link>
                </Button>
            </div>
        </div>
    )
}
