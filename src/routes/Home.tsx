
function Home() {
    return (
        <div className="relative w-full h-screen flex justify-center items-center bg-primary px-5">
            <div className="flex flex-col justify-center w-full max-w-[420px] h-[320px] rounded-[25px] bg-dark items-center z-20">
                <h1 className={`font-title text-text text-header uppercase`}>Hello World</h1>
                <p className="text-regular text-text2">This is a longer sentence.</p>
            </div>
        </div>
    )
}

export default Home