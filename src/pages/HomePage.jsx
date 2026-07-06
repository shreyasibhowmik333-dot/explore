import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {
  fetchAllPackages,
  addPackage,
  updatePackage
} from "../features/packageSlice";
import { createBooking } from "../features/bookingSlice";
import Banner from "../components/Banner";
import { MdStarRate } from "react-icons/md";
import { MdStarHalf } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import about_img from "../assets/about1.jpg";
import about_img1 from "../assets/about2.jpg";
import about_img2 from "../assets/about3.jpg";
import { MdFlight } from "react-icons/md";
import { GrAccessibility } from "react-icons/gr";
import { FaCar } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import Footer from "../components/Footer";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";

const HomePage = () => {
  const dispatch = useDispatch();

  const [seatModal, setSeatModal] = useState(null);
  const [seatCount, setSeatCount] = useState("");


  const [deleteModal, setDeleteModal] = useState(false)
  const [travelId, settravelId] = useState(null);

  const { packages, loading, error, page, totalPages } =
    useSelector((state) => state.package);

  const { user } = useSelector((state) => state.user);

  // -------- Add Package State --------
  const [newPackage, setNewPackage] = useState({
    title: "",
    price: "",
    details: "",
    description: "",
    image: null,
  });


  // -------- Edit Package State --------
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [editPackageData, setEditPackageData] = useState({
    title: "",
    price: "",
    details: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    dispatch(fetchAllPackages({ page, limit: 3 }));
  }, [dispatch, page]);


  // -------- Handlers --------
  const handleChange = (e, isEdit = false) => {
    const { name, value, files } = e.target;
    const val = files && files.length > 0 ? files[0] : value;

    if (isEdit) {
      setEditPackageData((prev) => ({ ...prev, [name]: val }));
    } else {
      setNewPackage((prev) => ({ ...prev, [name]: val }));
    }
  };

  // -------- Add Package --------
  const handleAddPackage = async () => {
    if (user?.role !== "admin") return alert("Only admins can add packages");

    const { title, price, details, description, image } = newPackage;
    if (!title || !price || !details || !description || !image) {
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("details", details);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await dispatch(addPackage(formData)).unwrap();
      setNewPackage({ title: "", price: "", details: "", description: "", image: null });
      toast.success("Package added successfully")

    } catch (err) {
      toast.error("All fields are required, including image");
    }
  };

  // -------- Start Editing --------
  const startEdit = (pkg) => {
    setEditingPackageId(pkg._id);
    setEditPackageData({
      title: pkg.title,
      price: pkg.price,
      details: pkg.details,
      description: pkg.description,
      image: null,
    });
  };

  // -------- Cancel Editing --------
  const cancelEdit = () => {
    setEditingPackageId(null);
    setEditPackageData({ title: "", price: "", details: "", description: "", image: null });
  };

  // -------- Update Package --------
  const handleUpdatePackage = async (id) => {
    const { title, price, details, description, image } = editPackageData;
    if (!title || !price || !details || !description) {
      return alert("All fields are required for update");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("details", details);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      await dispatch(updatePackage({ id, formData })).unwrap();
      cancelEdit();
    } catch (err) {
      alert("Update failed: " + (err.message || err));
    }
  };


  const handleBookNow = async (pkg) => {
    if (!seatCount || Number(seatCount) <= 0) {
      toast.error("Please enter valid number of seats");
      return;
    }

    try {
      await dispatch(
        createBooking({
          travelId: pkg._id, 
          seats: Number(seatCount),
        })
      ).unwrap();

      toast.success(
        `Successfully booked ${seatCount} seat(s) for ${pkg.title}`
      );

      setSeatModal(null);
      setSeatCount("");
    } catch (err) {
      toast.error("Booking failed: " + (err.message || err));
    }
  };







  return (
    <>
      <Navbar />
      <Banner />

      {/* ------- about section starts -------  */}

      {/* responsive (about section) */}

      <section id="about" className="px-4 md:px-10 py-10">
        <div className='flex flex-col lg:flex-row gap-10 items-center'>
          {/* LEFT TEXT */}
          <div className='lg:w-1/2 w-full'>
            <div className='flex gap-2 items-center'>
              <div className='flex gap-1 text-2xl text-yellow-700'>
                <MdStarRate />
                <MdStarRate />
                <MdStarRate />
                <MdStarRate />
                <MdStarHalf />
              </div>
              <div>
                <p className='font-semibold text-sm md:text-base'>4.6 Rate by 1,24,000+ Reviews</p>
              </div>
            </div>

            <h3 className='text-3xl md:text-5xl lg:text-6xl font-semibold pt-5 leading-snug'>
              <span className='text-yellow-700'>Discover the </span>
              <span className='text-cyan-700'>world with us.</span>
            </h3>

            <p className='pt-5 max-w-full md:max-w-2xl text-sm md:text-base'>
              From breathtaking landscapes to cultural wonders, we craft journeys that bring your dream destinations to life. Whether you’re planning a relaxing getaway or an adventure-filled expedition, our team ensures every detail is taken care of.
            </p>

            <div className='flex gap-2 items-center pt-5 text-sm md:text-base'>
              <div className='text-xl text-yellow-700'><MdCheck /></div>
              <div>Premium Stays & Exclusive Deals</div>
            </div>
            <div className='flex gap-2 items-center pt-2 text-sm md:text-base'>
              <div className='text-xl text-yellow-700'><MdCheck /></div>
              <div>Tailored Packages for Every Traveler</div>
            </div>
            <div className='flex gap-2 items-center pt-2 text-sm md:text-base'>
              <div className='text-xl text-yellow-700'><MdCheck /></div>
              <div>Unmatched Support Before & During Trips</div>
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className='about-images lg:w-1/2 w-full flex lg:flex-row gap-5'>
            <div className='lg:w-1/2 w-full'>
              <img className='about_img rounded w-full h-auto object-cover' src={about_img} alt="" />
            </div>
            <div className='lg:w-1/2 w-full flex flex-col gap-5'>
              <div>
                <img className='about_img1 rounded w-full h-auto object-cover' src={about_img1} alt="" />
              </div>
              <div>
                <img className='about_img2 rounded w-full h-auto object-cover' src={about_img2} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ----- partner section responsive ----- */}

      <section id="partner" className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="position: relative z-10">
            <div className="text-center">
              <h3 className="
        text-yellow-400 font-semibold mx-auto
        text-3xl sm:text-4xl md:text-5xl
        max-w-lg
      ">
                Why we are your <span className="text-cyan-400">perfect travel partner</span>
              </h3>

              <h4 className="
        mt-6 text-white mx-auto
        text-sm sm:text-base
        max-w-lg mb-10
      ">
                We believe travel is more than just visiting new places — it’s about creating unforgettable experiences.
              </h4>
            </div>

            {/* Partner cards */}
            <div className="
      partner-main mx-auto
      grid grid-cols-1 md:grid-cols-2
      gap-10 lg:gap-20
    ">

              {/* Left column */}
              <div className="partner-child space-y-10">
                <div className="max-h-40">
                  <div className="icon-bg bg-white flex items-center justify-center text-3xl text-cyan-600">
                    <MdFlight />
                  </div>
                  <div className="text-white text-xl sm:text-2xl pt-3">
                    Instant booking
                  </div>
                  <p className="text-white pt-3 text-sm sm:text-base">
                    No more waiting! Book your flights, hotels, and activities instantly with our hassle-free system.
                  </p>
                </div>

                <div className="max-h-40">
                  <div className="icon-bg bg-white flex items-center justify-center text-3xl text-cyan-600">
                    <GrAccessibility />
                  </div>
                  <div className="text-white text-xl sm:text-2xl pt-3">
                    Tourist guides
                  </div>
                  <p className="text-white pt-3 text-sm sm:text-base">
                    No more waiting! Book your flights, hotels, and activities instantly with our hassle-free system.
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="partner-child space-y-10">
                <div className="max-h-40">
                  <div className="icon-bg bg-white flex items-center justify-center text-3xl text-cyan-600">
                    <FaCar />
                  </div>
                  <div className="text-white text-xl sm:text-2xl pt-3">
                    Pickup and drop
                  </div>
                  <p className="text-white pt-3 text-sm sm:text-base">
                    Enjoy smooth and reliable transfers with our door-to-door pickup and drop service.
                  </p>
                </div>

                <div className="max-h-40">
                  <div className="icon-bg bg-white flex items-center justify-center text-3xl text-cyan-600">
                    <GiReceiveMoney />
                  </div>
                  <div className="text-white text-xl sm:text-2xl pt-3">
                    Friendly price
                  </div>
                  <p className="text-white pt-3 text-sm sm:text-base">
                    We offer transparent pricing and value-for-money packages that suit every budget—without compromising on comfort and quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages List */}
      <section id="package">
        <div>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-semibold pt-5 text-center mt-10">
            <span className="text-yellow-700">Popular</span>{" "}
            <span className="text-cyan-700">packages</span>
          </h3>

          <p className="packages-para max-w-md mx-auto px-4 pt-5 text-center pb-5">
            Handpicked travel experiences designed to give you the best of every destination — at the best value.
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {loading && <p className="text-center">Loading packages...</p>}
          {!loading && packages.length === 0 && (
            <p className="text-center">No packages available</p>
          )}

          <div className="container mx-auto px-4">
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {packages.map((pkg) => (
                <div key={pkg._id}>
                  {editingPackageId === pkg._id ? (
                    <>
                      <input
                        type="text"
                        name="title"
                        value={editPackageData.title}
                        onChange={(e) => handleChange(e, true)}
                        className="w-full border p-2 mb-2"
                      />

                      <input
                        type="number"
                        name="price"
                        value={editPackageData.price}
                        onChange={(e) => handleChange(e, true)}
                        className="w-full border p-2 mb-2"
                      />

                      <input
                        type="text"
                        name="details"
                        value={editPackageData.details}
                        onChange={(e) => handleChange(e, true)}
                        className="w-full border p-2 mb-2"
                      />

                      <input
                        type="text"
                        name="description"
                        value={editPackageData.description}
                        onChange={(e) => handleChange(e, true)}
                        className="w-full border p-2 mb-2"
                      />

                      <input
                        type="file"
                        name="image"
                        onChange={(e) => handleChange(e, true)}
                        className="w-full mb-2"
                      />

                      <div className="flex gap-3 mt-3">
                        <button
                          className="w-16 bg-yellow-700 p-2 text-white rounded"
                          onClick={() => handleUpdatePackage(pkg._id)}
                        >
                          Save
                        </button>
                        <button
                          className="w-16 bg-yellow-700 p-2 text-white rounded"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="border border-gray h-full rounded-xl overflow-hidden flex flex-col">
                      <img
                        className="pack-img w-full h-48 object-cover"
                        src={pkg.image}
                        alt={pkg.title}
                      />

                      <div className="p-3 flex flex-col flex-grow">
                        <h3 className="text-xl md:text-2xl font-semibold mt-2">
                          {pkg.title}
                        </h3>

                        <p className="text-sm mt-1">{pkg.details}</p>

                        <p className="mt-1 flex-grow">
                          {pkg.description}
                        </p>

                        <p className="text-lg font-semibold pb-2">
                          Price: ${Number(pkg.price) || 0}
                        </p>

                        {/* Admin buttons */}
                        {user?.role === "admin" && (
                          <div className="flex gap-2 flex-wrap">
                            <button
                              className="bg-yellow-700 text-white w-16 p-2 rounded"
                              onClick={() => startEdit(pkg)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-yellow-700 text-white w-16 p-2 rounded"
                              onClick={() => {
                                setDeleteModal(true);
                                settravelId(pkg._id);
                              }}

                            >
                              Delete
                            </button>
                          </div>
                        )}




                        {/* Viewer button */}
                        {user?.role === "viewer" && (
                          <button
                            className="w-full sm:w-32 mt-2 text-white font-semibold p-2 rounded bg-yellow-700 hover:bg-gray-200 hover:text-cyan-700"
                            onClick={() => setSeatModal(pkg._id)}
                          >
                            Book Your Trip
                          </button>
                        )}


                        {seatModal === pkg._id && (
                          <div className="fixed top-0 left-0 w-full h-full bg-[#00000095] flex justify-center items-center">
                            <div className="w-96 p-4 bg-white rounded-lg">
                              <div className="mb-5 text-gray-500">How many seats do you want to book?</div>
                            <div className=" flex gap-2">                          
                              <input
                                type="number"
                                min="1"
                                value={seatCount}
                                onChange={(e) => setSeatCount(e.target.value)}
                                placeholder="No. of people"
                                className="border p-1 flex-1"
                              />

                              <button
                                className="bg-yellow-700 text-white px-3 rounded"
                                onClick={() => handleBookNow(pkg)}
                              >
                                Confirm
                              </button>

                              <button
                                className="bg-gray-300 px-3 rounded"
                                onClick={() => {
                                  setSeatModal(null);
                                  setSeatCount("");
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                            </div>
                          </div>
                        )}






                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {deleteModal && (
              <DeleteModal
                setDeleteModal={setDeleteModal}
                travelId={travelId}
              />
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10 mb-10 px-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={page === 1}
              onClick={() =>
                dispatch(fetchAllPackages({ page: page - 1, limit: 3 }))
              }
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() =>
                dispatch(fetchAllPackages({ page: page + 1, limit: 3 }))
              }
            >
              Next
            </button>
          </div>
        )}

        {/* Add Package Form */}
        {user?.role === "admin" && (
          <div className="border border-gray-400 p-5 m-5 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-3">Add New Package</h2>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newPackage.title}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newPackage.price}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />

            <input
              type="text"
              name="details"
              placeholder="Details"
              value={newPackage.details}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newPackage.description}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />

            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full mb-3"
            />

            <button
              onClick={handleAddPackage}
              disabled={loading}
              className="bg-yellow-700 text-white px-4 py-2 rounded"
            >
              {loading ? "Adding..." : "Add Package"}
            </button>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
