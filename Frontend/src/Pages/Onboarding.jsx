import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api';
import useAuthUSer from '../hooks/useAuthUser';
import toast from 'react-hot-toast';
import { CameraIcon, LoaderIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react';
import { LANGUAGES } from '../constants/index';
import { useNavigate } from 'react-router';
import { useThemeStore } from '../store/useThemeStore';

function Onboarding() {
  const { authUser } = useAuthUSer();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { theme } = useThemeStore();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePic: authUser?.profilePic || '',
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Profile onboarded successfully');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const randomSeed = Math.floor(Math.random() * 100) + 1;
    const avatarUrl = `https://avatar.iran.liara.run/public/${randomSeed}`;
    setFormState((prev) => ({ ...prev, profilePic: avatarUrl }));
    toast.success('Random avatar generated!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4" data-theme={theme}>
      <div className="w-full max-w-6xl bg-base-200 rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side - Form */}
        <div className="w-full lg:w-2/3 p-6 sm:p-10">
          <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Complete Your Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-3">
              <div className="size-28 sm:size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img src={formState.profilePic} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-10 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              <button type="button" onClick={handleRandomAvatar} className="btn btn-outline btn-accent btn-sm">
                <ShuffleIcon className="size-4 mr-2" />
                Generate Avatar
              </button>
            </div>

            {/* Full Name */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={formState.fullName}
              onChange={handleChange}
              required
            />

            {/* Bio */}
            <textarea
              name="bio"
              placeholder="Short Bio"
              className="textarea textarea-bordered w-full"
              value={formState.bio}
              onChange={handleChange}
              rows={3}
            />

            {/* Languages */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                name="nativeLanguage"
                value={formState.nativeLanguage}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Native Language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                ))}
              </select>

              <select
                name="learningLanguage"
                value={formState.learningLanguage}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Learning Language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`learning-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <input
              type="text"
              name="location"
              placeholder="City, Country"
              className="input input-bordered w-full"
              value={formState.location}
              onChange={handleChange}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Save Profile
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Saving...
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side - Welcome Preview */}
        <div className="hidden lg:flex w-full lg:w-1/3 bg-primary/10 items-center justify-center p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-primary">Welcome to Fun Chat!</h3>
            <p className="text-base-content opacity-80 text-sm">
              Add your details and language preferences to get started. Connect with people around the world and start learning together!
            </p>
            <img
              src="/LearningLanguages.png"
              alt="Welcome"
              className="w-40 h-40 mx-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
