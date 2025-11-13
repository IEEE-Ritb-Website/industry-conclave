
interface HeadingProps {
    title: string;
    subtitle: string;
}

export default function Heading({ title, subtitle }: HeadingProps) {
    return (
        <div className="w-full text-center flex flex-col items-center">
            <h2 className="text-5xl font-semibold capitalize max-w-2xl mb-2">{title}</h2>
            <p className="text-md font-light text-foreground max-w-2xl">{subtitle}</p>
        </div>
    )
}
