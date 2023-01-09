export const BookingForm = () => {
  const inputClasses =
    "mt-1 py-2 block w-full rounded-md border-b-sswRed-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";

  const countriesList = [
    {
      label: "Australia",
      value: "australia",
    },
    {
      label: "China",
      value: "china",
    },
    {
      label: "Europe",
      value: "eu",
    },
    {
      label: "South America",
      value: "southamerica",
    },
    {
      label: "USA",
      value: "usa",
    },

    {
      label: "Other",
      value: "other",
    },
  ];

  return (
    <>
      <h1 className="text-sswRed text-2xl">Get your project started!</h1>
      <form>
        <span className="text-gray-700">Your Full Name</span>
        <input className={inputClasses}></input>
        <span className="text-gray-700">Your Email</span>
        <input className={inputClasses}></input>
        <span className="text-gray-700">Your Phone</span>
        <input className={inputClasses}></input>
        <select
          required
          onClick={(e) => {
            // handleInput(ACTIVE_INPUT.Location, e.currentTarget.value);
          }}
          onChange={(e) => {
            // e.currentTarget.value == "australia"
            //   ? setIsShowState(true)
            //   : setIsShowState(false);
          }}
        >
          <option className="d-none" value="">
            Location
          </option>
          {countriesList.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
        <span className="text-gray-700">Your Company</span>
        <input className={inputClasses}></input>

        <span className="text-gray-700">Note</span>
        <textarea className={inputClasses}></textarea>

        {/* TODO: Add reCaptcha thing */}

        <button className="bg-sswRed text-white rounded p-2 my-4">SUBMIT</button>
      </form>
    </>
  );
};
