import Link from "next/link";
import React, { ReactNode } from "react";
import { useState } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import { useProject } from "~/contexts/ProjectContext";

import ProjectOverviewCard from "~/components/ProjectOverviewCard";
import CreateProjectModal from "~/components/CreateProjectModal";


interface UserOverviewProps {
  children: ReactNode;
  signOut: () => void;
}

const UserOverview: React.FC<UserOverviewProps> = ({
  children,
  signOut,
}) => {

  const session = useSession();
  const {
    projects
  } = useProject();

  const isLoggedIn = !!session.data;

  const [ownedToggled, setOwnedToggled] = useState(false);
  const handleOwnedToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOwnedToggled(event.target.checked);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <body className="drawer min-h-screen bg-base-200 lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <main className="drawer-content">
        <div className="grid grid-cols-12 grid-rows-[min-content] gap-y-12 p-4 lg:gap-x-12 lg:p-10">
          <header className="col-span-12 flex items-center gap-2 lg:gap-4">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </label>
            <div className="grow">
              <h1 className="lg:text-2xl lg:font-light">Overview</h1>
            </div>
            {/* <div>
              <input
                type="text"
                placeholder="Search"
                className="input input-sm rounded-full max-sm:w-24" />
            </div> */}

            <div className="dropdown dropdown-end z-10">
              <div tabIndex={0} className="btn btn-circle btn-ghost">
                <div className="indicator">
                  <span className="badge indicator-item badge-error badge-xs"></span>
                  {/* BELL */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-80 rounded-box bg-base-100 p-2 shadow-2xl">
                <li>
                  <a className="gap-4">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={isLoggedIn ? session?.data?.user?.image ?? undefined : undefined}
                          alt="User account image"/>
                      </div>
                    </div>
                    <span>
                      <b>New message</b>
                      <br />
                      Alice: Hi, did you get my files?
                    </span>
                  </a>
                </li>
                <li>
                  <a className="gap-4">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={isLoggedIn ? session?.data?.user?.image ?? undefined : undefined}
                          alt="User account image" />
                      </div>
                    </div>
                    <span>
                      <b>Reminder</b>
                      <br />
                      Your meeting is at 10am
                    </span>
                  </a>
                </li>
                <li>
                  <a className="gap-4">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={isLoggedIn ? session?.data?.user?.image ?? undefined : undefined}
                          alt="User account image" />
                      </div>
                    </div>
                    <span>
                      <b>New payment</b>
                      <br />
                      Received $2500 from John Doe
                    </span>
                  </a>
                </li>
                <li>
                  <a className="gap-4">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={isLoggedIn ? session?.data?.user?.image ?? undefined : undefined}
                          alt="User account image" />
                      </div>
                    </div>
                    <span>
                      <b>New payment</b>
                      <br />
                      Received $1900 from Alice
                    </span>
                  </a>
                </li>
              </ul>
            </div>


            <div className="dropdown-end dropdown z-10">
              <div tabIndex={0} className="avatar btn btn-circle btn-ghost">
                <div className="w-10 rounded-full">
                  <img
                    src={isLoggedIn ? session?.data?.user?.image ?? undefined : undefined}
                    alt="User account image" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow-2xl">
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>
                    Inbox
                    <span className="badge badge-success">12</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li>
                  <a onClick={() => signOut()}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </header>

          <section className="col-span-12">
            <div className="flex">
              <h2 className="text-xl font-semibold flex-1">Your Projects</h2>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={ownedToggled}
                onChange={handleOwnedToggleChange}
              />
              {
                ownedToggled ? (
                  <div className="badge badge-accent gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-4 w-4 stroke-current">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Owned
                  </div>
                ) : (
                  <div className="badge gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-4 w-4 stroke-current">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    All
                  </div>
                )
              }
              <button
                className="btn btn-sm btn-primary flex items-center gap-2"
                onClick={openModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New
              </button>
            </div>
            {/* <div className="divider divider-start divider-neutral w-full">
              All
            </div> */}

            <div className="carousel carousel-center rounded-box bg-base-300 space-x-2 p-2 w-full">
              {projects.length === 0 ? (
                <p className="text-gray-500">
                  No projects available. Create a new project to get started.
                </p>
              ) : (
                <div className="flex space-x-2">
                    {ownedToggled ? (projects
                      .filter(
                        (project) => project.ownerId === session.data?.user.id)
                      .map((project) => (
                      <div className="carousel-item">
                        <ProjectOverviewCard
                          key={project.id} project={project}
                        >
                          {project.name}
                        </ProjectOverviewCard>
                      </div>
                    ))) : (projects
                      .map((project) => (
                        <div className="carousel-item">
                          <ProjectOverviewCard
                            key={project.id} project={project}
                          >
                            {project.name}
                          </ProjectOverviewCard>
                        </div>
                      ))
                    )}
                </div>
              )}
            </div>
            <CreateProjectModal isOpen={isModalOpen} onClose={closeModal} />
          </section>



          <section className="stats stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
            <div className="stat">
              <div className="stat-title">Total Page Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-title">Total Page Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-title">Total Page Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-title">Total Page Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </section>


          <section className="card col-span-12 overflow-hidden bg-base-100 shadow-sm xl:col-span-6">
            <div className="card-body grow-0">
              <h2 className="card-title">
                <a className="link-hover link">Transactions</a>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <tbody>
                  <tr>
                    <td>Cy Ganderton</td>
                    <td>Feb 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
                        className="inline-block h-5 w-5 text-success"></svg>
                      180 USD
                    </td>
                  </tr>
                  <tr>
                    <td>Hart Hagerty</td>
                    <td>Sep 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
                        className="inline-block h-5 w-5 text-success"></svg>
                      250 USD
                    </td>
                  </tr>
                  <tr>
                    <td>Jim Hagerty</td>
                    <td>Sep 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
                        className="inline-block h-5 w-5 text-success"></svg>
                      250 USD
                    </td>
                  </tr>
                  <tr>
                    <td>Hart Hagerty</td>
                    <td>Sep 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-down-right.svg"
                        className="inline-block h-5 w-5 text-error"></svg>
                      250 USD
                    </td>
                  </tr>
                  <tr>
                    <td>Hart Hagerty</td>
                    <td>Sep 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-down-right.svg"
                        className="inline-block h-5 w-5 text-error"></svg>
                      250 USD
                    </td>
                  </tr>
                  <tr>
                    <td>Brice Swyre</td>
                    <td>Jul 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
                        className="inline-block h-5 w-5 text-success"></svg>
                      320 USD
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>


          <section className="card col-span-12 bg-primary text-primary-content shadow-sm xl:col-span-6">
            <div className="card-body pb-0">
              <h2 className="card-title">21,500 USD</h2>
              <a className="link-hover link text-xs">Revenue report →</a>
            </div>
          </section>


          <section className="card col-span-12 bg-base-100 shadow-sm xl:col-span-4">
            <div className="card-body">
              <h2 className="card-title">Sources</h2>
              <div className="flex items-center gap-10">
                <div className="grow">
                  <div className="flex items-center gap-2">
                    <span className="badge badge-xs bg-[#19D6BF]"></span>
                    Direct
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-xs bg-[#A838FF]"></span>
                    Social
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-xs bg-[#3C37FF]"></span>
                    Search
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-xs bg-[#FFBD3C]"></span>
                    Email
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section className="card col-span-12 bg-base-100 shadow-sm xl:col-span-4">
            <div className="card-body pb-0">
              <h2 className="card-title">19,000</h2>
              <p>Downloads</p>
            </div>
          </section>


          <section className="card col-span-12 bg-base-100 shadow-sm xl:col-span-4">
            <div className="card-body pb-0">
              <h2 className="card-title">32,800</h2>
              <p>Unique visitors</p>
            </div>
          </section>


          <header className="col-span-12 flex items-center gap-2 lg:gap-4">
            <div className="grow">
              <h1 className="font-light lg:text-2xl">Forms and inputs</h1>
            </div>
          </header>


          <section className="col-span-12 xl:col-span-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product name</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select className="select select-bordered">
                <option disabled selected>Pick</option>
                <option>T-shirts</option>
                <option>Dresses</option>
                <option>Hats</option>
                <option>Accessories</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Size (cm)</span>
              </label>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Width" className="input input-bordered w-1/2" />
                ×
                <input type="text" placeholder="Height" className="input input-bordered w-1/2" />
              </div>
            </div>
            <hr className="my-6 border-t-2 border-base-content/5" />
            <div className="form-control">
              <div className="label justify-start gap-2">
                <svg
                  data-src="https://unpkg.com/heroicons/20/solid/eye.svg"
                  className="h-4 w-4 text-base-content/30"></svg>
                <span className="label-text text-xs font-bold text-base-content/50">
                  Choose product visibility
                </span>
              </div>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Visible only for managers</span>
                <input name="visibility" type="radio" className="radio radio-sm" checked />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Visible for all users</span>
                <input name="visibility" type="radio" className="radio radio-sm" checked />
              </label>
            </div>
          </section>


          <section className="card col-span-12 bg-base-100 shadow-sm xl:col-span-5">
            <div className="card-body pb-0">
              <h2 className="card-title">32,800</h2>
              <p>From 84 countries</p>
            </div>
            <svg
              data-src="https://unpkg.com/@svg-maps/world@1.0.1/world.svg"
              className="m-4 fill-base-content/80" />
          </section>


          <section className="card col-span-12 bg-base-100 shadow-sm xl:col-span-3">
            <div className="p-6 pb-0 text-center text-xs font-bold text-base-content/60">
              Recent events
            </div>
            <ul className="menu">
              <li>
                <a className="gap-4">
                  <div className="avatar">
                    <div className="w-6 rounded-full">
                      <img src="https://picsum.photos/80/80?6" />
                    </div>
                  </div>
                  <span className="text-xs">
                    <b>New User</b>
                    <br />
                    2 minutes ago
                  </span>
                </a>
              </li>
              <li>
                <a className="gap-4">
                  <div className="avatar">
                    <div className="w-6 rounded-full">
                      <img src="https://picsum.photos/80/80?7" />
                    </div>
                  </div>
                  <span className="text-xs">
                    <b>New product added</b>
                    <br />
                    1 hour ago
                  </span>
                </a>
              </li>
              <li>
                <a className="gap-4">
                  <div className="avatar">
                    <div className="w-6 rounded-full">
                      <img src="https://picsum.photos/80/80?8" />
                    </div>
                  </div>
                  <span className="text-xs">
                    <b>Database update</b>
                    <br />
                    1 hour ago
                  </span>
                </a>
              </li>
              <li>
                <a className="gap-4">
                  <div className="avatar">
                    <div className="w-6 rounded-full">
                      <img src="https://picsum.photos/80/80?9" />
                    </div>
                  </div>
                  <span className="text-xs">
                    <b>Newsletter sent</b>
                    <br />
                    2 hour ago
                  </span>
                </a>
              </li>
              <li>
                <a className="gap-4">
                  <div className="avatar">
                    <div className="w-6 rounded-full">
                      <img src="https://picsum.photos/80/80?10" />
                    </div>
                  </div>
                  <span className="text-xs">
                    <b>New User</b>
                    <br />
                    2 hours ago
                  </span>
                </a>
              </li>
              <li>
                <a className="gap-4">
                  <div className="avatar">
                    <div className="w-6 rounded-full">
                      <img src="https://picsum.photos/80/80?11" />
                    </div>
                  </div>
                  <span className="text-xs">
                    <b>New product added</b>
                    <br />
                    yesterday
                  </span>
                </a>
              </li>
              <li>
                <a className="gap-4">
                  <div className="avatar">
                    <div className="w-6 rounded-full">
                      <img src="https://picsum.photos/80/80?12" />
                    </div>
                  </div>
                  <span className="text-xs">
                    <b>New product added</b>
                    <br />
                    yesterday
                  </span>
                </a>
              </li>
            </ul>
          </section>


          <header className="col-span-12 flex items-center gap-2 lg:gap-4">
            <div className="grow">
              <h1 className="font-light lg:text-2xl">Form sections</h1>
            </div>
          </header>


          <section className="col-span-12 xl:col-span-4">
            <label className="label">
              <span className="label-text">Product management</span>
            </label>
            <ul className="flex flex-col gap-4 p-1">
              <li className="flex items-start gap-4">
                <img
                  className="h-14 w-14 shrink-0 rounded-btn"
                  width="56"
                  height="56"
                  src="https://picsum.photos/80/80?id=1"
                  alt="Product" />
                <div className="flex grow flex-col gap-1">
                  <div className="text-sm">Portable fidget spinner</div>
                  <div className="text-xs text-base-content/50">Space Gray</div>
                  <div className="font-mono text-xs text-base-content/50">$299</div>
                </div>
                <div className="join justify-self-end bg-base-100">
                  <button className="btn btn-ghost join-item btn-xs">–</button>
                  <input className="input join-item input-ghost input-xs w-10 text-center" value="1" />
                  <button className="btn btn-ghost join-item btn-xs">+</button>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <img
                  className="h-14 w-14 shrink-0 rounded-btn"
                  width="56"
                  height="56"
                  src="https://picsum.photos/80/80?id=2"
                  alt="Product" />
                <div className="flex grow flex-col gap-1">
                  <div className="text-sm">Wooden VR holder</div>
                  <div className="text-xs text-base-content/50">Casual Red</div>
                  <div className="font-mono text-xs text-base-content/50">$199</div>
                </div>
                <div className="join justify-self-end bg-base-100">
                  <button className="btn btn-ghost join-item btn-xs">–</button>
                  <input className="input join-item input-ghost input-xs w-10 text-center" value="1" />
                  <button className="btn btn-ghost join-item btn-xs">+</button>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <img
                  className="h-14 w-14 shrink-0 rounded-btn"
                  width="56"
                  height="56"
                  src="https://picsum.photos/80/80?id=3"
                  alt="Product" />
                <div className="flex grow flex-col gap-1">
                  <div className="text-sm">Portable keychain</div>
                  <div className="text-xs text-base-content/50">Normal Yellow</div>
                  <div className="font-mono text-xs text-base-content/50">$299</div>
                </div>
                <div className="join justify-self-end bg-base-100">
                  <button className="btn btn-ghost join-item btn-xs">–</button>
                  <input className="input join-item input-ghost input-xs w-10 text-center" value="1" />
                  <button className="btn btn-ghost join-item btn-xs">+</button>
                </div>
              </li>
            </ul>
          </section>


          <section className="col-span-12 xl:col-span-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product name</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select className="select select-bordered">
                <option disabled selected>Pick</option>
                <option>T-shirts</option>
                <option>Dresses</option>
                <option>Hats</option>
                <option>Accessories</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Public</span>
                <input type="checkbox" className="toggle toggle-sm" checked />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Featured product</span>
                <input type="checkbox" className="toggle toggle-sm" checked />
              </label>
            </div>
          </section>


          <section className="col-span-12 xl:col-span-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Size (cm)</span>
              </label>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Width" className="input input-bordered w-1/2" />
                ×
                <input type="text" placeholder="Height" className="input input-bordered w-1/2" />
              </div>
            </div>
            <div className="form-control">
              <div className="py-4 text-xs text-base-content/70">
                Set a audience range for this product.
                <br />
                This is optional
              </div>
              <input type="range" min="0" max="100" value="25" className="range range-xs" step="25" />
              <div className="flex w-full justify-between px-2 py-2 text-xs">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>
            <div className="form-control">
              <div className="flex gap-4 py-4">
                <button className="btn btn-outline">Save draft</button>
                <button className="btn btn-primary grow">Save and publish</button>
              </div>
            </div>
          </section>


          <header className="col-span-12 flex items-center gap-2 lg:gap-4">
            <div className="grow">
              <h1 className="font-light lg:text-2xl">Payment information</h1>
            </div>
          </header>


          <section className="card col-span-12 bg-base-100 xl:col-span-5">
            <form className="card-body" action="">
              <div className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Your payment was successful</span>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Card Number</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered font-mono"
                  pattern="\d{16}"
                  title="16 digits card number"
                  minLength={16}
                  maxLength={16}
                  required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">CVV</span>
                  </label>
                  <input
                    type="text"
                    placeholder="XXX"
                    pattern="\d{3,4}"
                    title="3 or 4 digits CVV number"
                    minLength={3}
                    maxLength={4}
                    required
                    className="input input-bordered text-center font-mono" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Expiration date</span>
                  </label>
                  <div className="input input-bordered grid grid-cols-2 gap-2">
                    <input
                      placeholder="MM"
                      type="text"
                      pattern="\d{2}"
                      title="2 digits month number"
                      minLength={2}
                      maxLength={2}
                      className="text-center font-mono"
                      required />
                    <input
                      placeholder="YY"
                      type="text"
                      pattern="\d{2}"
                      title="2 digits year number"
                      minLength={2}
                      maxLength={2}
                      className="text-center font-mono"
                      required />
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" className="input input-bordered" />
              </div>
              <div className="form-control mt-4 gap-4">
                <label className="flex cursor-pointer gap-4">
                  <input type="checkbox" className="checkbox checkbox-sm" checked />
                  <span className="label-text">Save my card information for future payments</span>
                </label>
                <label className="flex cursor-pointer gap-4">
                  <input required type="checkbox" className="checkbox checkbox-sm" checked />
                  <span className="label-text">Accept terms of use and privac policy</span>
                </label>
              </div>
              <div className="form-control">
                <div className="flex items-end py-4">
                  <button className="btn btn-primary grow">Confirm Payment</button>
                </div>
              </div>
            </form>
          </section>


          <section className="card col-span-12 overflow-hidden bg-base-100 shadow-sm xl:col-span-7">
            <div className="card-body grow-0">
              <div className="flex justify-between gap-2">
                <h2 className="card-title grow">
                  <a className="link-hover link">Recent user transactions</a>
                </h2>
                <button className="btn btn-sm">See all users</button>
                <button className="btn btn-sm">Settings</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <tbody>
                  <tr>
                    <td className="w-0"><input type="checkbox" className="checkbox" /></td>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img
                              src="https://picsum.photos/80/80?1"
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">Hart Hagerty</div>
                          <div className="text-xs opacity-50">United States</div>
                        </div>
                      </div>
                    </td>
                    <td>Feb 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
                        className="inline-block h-5 w-5 text-success"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-id="svg-loader_3">
                        <path
                          fill-rule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clip-rule="evenodd"></path>
                      </svg>
                      180 USD
                    </td>
                  </tr>
                  <tr>
                    <td className="w-0"><input type="checkbox" className="checkbox" /></td>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img
                              src="https://picsum.photos/80/80?2"
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">Brice Swyre</div>
                          <div className="text-xs opacity-50">China</div>
                        </div>
                      </div>
                    </td>
                    <td>Sep 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
                        className="inline-block h-5 w-5 text-success"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-id="svg-loader_4">
                        <path
                          fill-rule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clip-rule="evenodd"></path>
                      </svg>
                      250 USD
                    </td>
                  </tr>
                  <tr>
                    <td className="w-0"><input type="checkbox" className="checkbox" /></td>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img
                              src="https://picsum.photos/80/80?3"
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">Marjy Ferencz</div>
                          <div className="text-xs opacity-50">Russia</div>
                        </div>
                      </div>
                    </td>
                    <td>Sep 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
                        className="inline-block h-5 w-5 text-success"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-id="svg-loader_5">
                        <path
                          fill-rule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clip-rule="evenodd"></path>
                      </svg>
                      250 USD
                    </td>
                  </tr>
                  <tr>
                    <td className="w-0"><input type="checkbox" className="checkbox" /></td>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img
                              src="https://picsum.photos/80/80?4"
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">Yancy Tear</div>
                          <div className="text-xs opacity-50">Brazil</div>
                        </div>
                      </div>
                    </td>
                    <td>Sep 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-down-right.svg"
                        className="inline-block h-5 w-5 text-error"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-id="svg-loader_6">
                        <path
                          d="M6.28 5.22a.75.75 0 00-1.06 1.06l7.22 7.22H6.75a.75.75 0 000 1.5h7.5a.747.747 0 00.75-.75v-7.5a.75.75 0 00-1.5 0v5.69L6.28 5.22z"></path>
                      </svg>
                      250 USD
                    </td>
                  </tr>
                  <tr>
                    <td className="w-0"><input type="checkbox" className="checkbox" /></td>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img
                              src="https://picsum.photos/80/80?5"
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">Marjy Ferencz</div>
                          <div className="text-xs opacity-50">Russia</div>
                        </div>
                      </div>
                    </td>
                    <td>Sep 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-down-right.svg"
                        className="inline-block h-5 w-5 text-error"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-id="svg-loader_7">
                        <path
                          d="M6.28 5.22a.75.75 0 00-1.06 1.06l7.22 7.22H6.75a.75.75 0 000 1.5h7.5a.747.747 0 00.75-.75v-7.5a.75.75 0 00-1.5 0v5.69L6.28 5.22z"></path>
                      </svg>
                      250 USD
                    </td>
                  </tr>
                  <tr>
                    <td className="w-0"><input type="checkbox" className="checkbox" /></td>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img
                              src="https://picsum.photos/80/80?6"
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">Hart Hagerty</div>
                          <div className="text-xs opacity-50">United States</div>
                        </div>
                      </div>
                    </td>
                    <td>Jul 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
                        className="inline-block h-5 w-5 text-success"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-id="svg-loader_8">
                        <path
                          fill-rule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clip-rule="evenodd"></path>
                      </svg>
                      320 USD
                    </td>
                  </tr>

                  <tr>
                    <td className="w-0"><input type="checkbox" className="checkbox" /></td>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle h-10 w-10">
                            <img
                              src="https://picsum.photos/80/80?1"
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">Hart Hagerty</div>
                          <div className="text-xs opacity-50">United States</div>
                        </div>
                      </div>
                    </td>
                    <td>Feb 2nd</td>
                    <td>
                      <svg
                        data-src="https://unpkg.com/heroicons/20/solid/arrow-up-right.svg"
                        className="inline-block h-5 w-5 text-success"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-id="svg-loader_3">
                        <path
                          fill-rule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clip-rule="evenodd"></path>
                      </svg>
                      180 USD
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>

      <aside className="drawer-side z-10">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <nav className="flex min-h-screen w-72 flex-col gap-2 overflow-y-auto bg-base-100 px-6 py-10">
          <div className="mx-4 flex items-center gap-2 font-black">
            <svg
              width="32"
              height="32"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="256" y="670.72" width="512" height="256" rx="128" className="fill-base-content" />
              <circle cx="512" cy="353.28" r="256" className="fill-base-content" />
              <circle
                cx="512"
                cy="353.28"
                r="261"
                stroke="black"
                stroke-opacity="0.2"
                stroke-width="10" />
              <circle cx="512" cy="353.28" r="114.688" className="fill-base-100" />
            </svg>
            Systematic Review Tool
          </div>
          <ul className="menu">
            <li>
              <a className="active">
                <svg data-src="https://unpkg.com/heroicons/20/solid/home.svg" className="h-5 w-5"></svg>
                User Dashboard
              </a>
            </li>
            <li>
              <a>
                <svg data-src="https://unpkg.com/heroicons/20/solid/user.svg" className="h-5 w-5"></svg>
                Community
              </a>
            </li>
            {/* <li>
              <a>
                <svg data-src="https://unpkg.com/heroicons/20/solid/user.svg" className="h-5 w-5"></svg>
                Users
              </a>
            </li>
            <li>
              <details>
                <summary>
                  <svg
                    data-src="https://unpkg.com/heroicons/20/solid/squares-2x2.svg"
                    className="h-5 w-5"></svg>
                  Products
                </summary>
                <ul>
                  <li><a>All Products</a></li>
                  <li><a>Add New</a></li>
                  <li><a>Categories</a></li>
                  <li><a>Tags</a></li>
                  <li><a>Reports</a></li>
                  <li><a>Archive</a></li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  <svg
                    data-src="https://unpkg.com/heroicons/20/solid/credit-card.svg"
                    className="h-5 w-5"></svg>
                  Transactions
                </summary>
                <ul>
                  <li><a>All Transactions</a></li>
                  <li><a>Failed Transactions</a></li>
                  <li><a>Successful Transactions</a></li>
                </ul>
              </details>
            </li>
            <li>
              <a>
                <svg
                  data-src="https://unpkg.com/heroicons/20/solid/chart-pie.svg"
                  className="h-5 w-5"></svg>
                Stats
              </a>
            </li>
            <li>
              <a>
                <svg
                  data-src="https://unpkg.com/heroicons/20/solid/document-text.svg"
                  className="h-5 w-5"></svg>
                Logs
              </a>
            </li>
            <li>
              <a>
                <svg data-src="https://unpkg.com/heroicons/20/solid/inbox.svg" className="h-5 w-5"></svg>
                Messages
                <span className="badge badge-info badge-sm">12</span>
              </a>
            </li>
            <li>
              <details>
                <summary>
                  <svg
                    data-src="https://unpkg.com/heroicons/20/solid/adjustments-vertical.svg"
                    className="h-5 w-5"></svg>
                  Settings
                </summary>
                <ul>
                  <li><a>General</a></li>
                  <li><a>Themes</a></li>
                  <li><a>Routes</a></li>
                  <li><a>Comments</a></li>
                  <li><a>Media</a></li>
                  <li><a>Roles</a></li>
                  <li><a>Merchants</a></li>
                  <li>
                    <a>Tools</a>
                    <ul>
                      <li><a>Files</a></li>
                      <li><a>Scripts</a></li>
                      <li><a>Suggestions</a></li>
                    </ul>
                  </li>
                  <li><a>Databases</a></li>
                  <li><a>Gateways</a></li>
                  <li><a>Plugins</a></li>
                  <li><a>API</a></li>
                  <li><a>Support</a></li>
                </ul>
              </details>
            </li> */}
          </ul>
        </nav>

      </aside>
    </body>
  );
}

export default UserOverview;