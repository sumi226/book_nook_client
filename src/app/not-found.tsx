import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return <main id="main-content" className="not-found-page"><div className="not-found-art"><span>04</span><BookOpen size={72} strokeWidth={0.8} /><span>04</span></div><p className="eyebrow"><span className="eyebrow-line" />A page out of place</p><h1>This story is <em>still unwritten.</em></h1><p>The page you’re looking for has wandered off the shelf. Let’s find you another one.</p><Link href="/" className="button button-primary"><ArrowLeft size={16} /> Back to the nook</Link></main>;
}
