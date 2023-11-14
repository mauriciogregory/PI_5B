export default function FormAction({
    handleSubmit,
    text,
    disabled=false
}){
    const default_style = "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-10"
    const disabled_style ="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 mt-10"
    return(
            <button
                type='submit'
                className={disabled ? disabled_style : default_style }
                onSubmit={handleSubmit}
                disabled={disabled}
            >

                {text}
            </button>
    )
}
