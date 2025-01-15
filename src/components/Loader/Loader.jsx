import { loader } from '/src/assets';

const Loader = ({ title }) => (
  <div className="w-full d-flex flex-column justify-content-center align-items-center">
    <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
    <h1 className="font-bold text-2xl text-white mt-2">
      {title || 'Loading...'}
    </h1>
  </div>
);

export default Loader;
