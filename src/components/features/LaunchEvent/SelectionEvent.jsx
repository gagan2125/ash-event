import "../../../styles/global.css";
const SelectionEvent = () => {
  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center relative text-white"
      style={{
        backgroundImage:
          "url('https://www.bestpartiesever.com/wp-content/uploads/dc3ac80641ce03d85fffcb9e0f96396a-ezgif.com-optiwebp.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md"></div>
      <div className="relative flex flex-col items-center gap-10 z-10 text-center">
        <div className="text-3xl sm:text-3xl font-bold px-4">
          <h1 className="text-2xl md:text-4xl animate-gradientText bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            Let’s Launch Your Event
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
          <a
            href={`/create-event-user/${"rsvp"}`}
            className="bg-primary border-2 border-secondary bg-opacity-90 p-6 sm:p-10 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer flex flex-col items-center space-y-4 w-full sm:w-64 md:w-80 shiny-border"
          >
            <img
              src="https://t4.ftcdn.net/jpg/02/56/63/93/360_F_256639327_i4SnYVgaRNsMz5GWWB68owtKepLI1XKa.jpg"
              alt="RSVP Logo"
              className="w-12 h-12 sm:w-20 sm:h-20 object-contain rounded-full"
            />
            <h2 className="text-xl sm:text-2xl font-semibold">RSVP only</h2>
          </a>
          <a
            href={`/create-event-user/${"ticket"}`}
            className="bg-primary border-2 border-secondary bg-opacity-90 p-6 sm:p-10 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer flex flex-col items-center space-y-4 w-full sm:w-64 md:w-80 shiny-border"
          >
            <img
              src="https://media.istockphoto.com/id/1414997110/vector/tickets-pass-vector-icon-in-line-style-design-isolated-on-white-background-editable-stroke.jpg?s=612x612&w=0&k=20&c=WxbLbzrmrqvztOvr7CcWs_o_VWohG5-xlmFp60kmH0Q="
              alt="Ticketed Logo"
              className="w-12 h-12 sm:w-20 sm:h-20 object-contain rounded-full"
            />
            <h2 className="text-xl sm:text-2xl font-semibold">Ticketed</h2>
          </a>
        </div>
        <div className="text-lg sm:text-xl underline cursor-pointer">
          <a href="/">Back</a>
        </div>
      </div>
    </div>
  );
};

export default SelectionEvent;
