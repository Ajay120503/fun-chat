import React from 'react';
import useAuthUSer from '../hooks/useAuthUser';
import { Link, useLocation } from 'react-router';
import { BellDotIcon, HomeIcon, Smartphone, UserPen, Users2Icon } from 'lucide-react';

function Sidebar() {
  const { authUser } = useAuthUSer();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <Smartphone className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            FUN CHAT
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          aria-current={currentPath === '/' ? 'page' : undefined}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === '/' ? 'btn-active' : ''
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          aria-current={currentPath === '/friends' ? 'page' : undefined}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === '/friends' ? 'btn-active' : ''
          }`}
        >
          <Users2Icon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          aria-current={currentPath === '/notifications' ? 'page' : undefined}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === '/notifications' ? 'btn-active' : ''
          }`}
        >
          <BellDotIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>

        <Link
          to="/onboading"
          aria-current={currentPath === '/onboading' ? 'page' : undefined}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === '/onboading' ? 'btn-active' : ''
          }`}
        >
          <UserPen className="size-5 text-base-content opacity-70" />
          <span>Update Profile</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic || '/default-avatar.png'} />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm truncate max-w-[140px]">
              {authUser?.fullName}
            </p>
            <p className="text-xs text-success flex items-center gap-1">
              <span>Online</span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
