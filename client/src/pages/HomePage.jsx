import illustration from "@/assets/illustration.svg"
import FormComponent from "@/components/forms/FormComponent"
// import Footer from "@/components/common/Footer";

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-16">
            <div className="flex flex-col items-center h-full min-w-full my-12 justify-evenly sm:flex-row sm:pt-0">
                <div className="flex justify-center w-full animate-up-down sm:w-1/2 sm:pl-4">
                    <img
                        src={"https://techwithjoshi.vercel.app/assets/image/logo-svg-lab.svg"}
                        alt="BuddyCode Illustration"
                        className="mx-auto w-[250px] sm:w-[400px]"
                    />
                    
                
                </div>
             
                <div className="flex items-center justify-center w-full sm:w-1/2">
                    <FormComponent />
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default HomePage
