import { Suspense } from "react";
import SpeakersContent from "./speakers-content";
import { Loader2 } from "lucide-react";

export default function SpeakersPage() {
    return (
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <SpeakersContent />
        </Suspense>
    );
}