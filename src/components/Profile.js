import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    favoriteCuisine: '',
    phoneNumber: ''
  });
  const [sellerRequest, setSellerRequest] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUser({ id: currentUser.uid, ...userDoc.data() });
          setFormData({
            displayName: userDoc.data().displayName || '',
            bio: userDoc.data().bio || '',
            favoriteCuisine: userDoc.data().favoriteCuisine || '',
            phoneNumber: userDoc.data().phoneNumber || ''
          });
          setSellerRequest(userDoc.data().sellerRequest || false);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.id), formData);
      setUser({ ...user, ...formData });
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setLoading(false);
  };

  const handleSellerRequest = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.id), { sellerRequest: true });
      setSellerRequest(true);
    } catch (error) {
      console.error('Error requesting seller status:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="profile-container"><div className="loader"></div></div>;
  }

  if (!user) {
    return <div className="profile-container">Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      {editing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="displayName">Name:</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="favoriteCuisine">Favorite Cuisine:</label>
            <input
              type="text"
              id="favoriteCuisine"
              name="favoriteCuisine"
              value={formData.favoriteCuisine}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="save-button">Save</button>
            <button type="button" onClick={() => setEditing(false)} className="cancel-button">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>Name:</strong> {user.displayName || 'Not set'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>
          <p><strong>Favorite Cuisine:</strong> {user.favoriteCuisine || 'Not specified'}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber || 'Not provided'}</p>
          {!sellerRequest && (
            <button onClick={handleSellerRequest} className="seller-request-button">Request to be a Seller</button>
          )}
          {sellerRequest && <p>Your request to be a seller has been submitted and awaits approval.</p>}
          <button onClick={() => setEditing(true)} className="edit-button">Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;