import { Suspense } from "react";
import SpeakersContent from "./speakers-content";

export default function SpeakersPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SpeakersContent />
        </Suspense>
    );
}