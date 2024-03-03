import './style.css';
import { addDateForAdds, makeImageUrl } from '../../Config/mongoDb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapForAddSell } from '../../Component/Maps';
import { useSelector } from 'react-redux';

const AddSellPost = () => {
    const [imageLink, setImageLink] = useState();
    const [imagesLinks, setImagesLinks] = useState([]);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const res = useSelector(res => res.userSlice.userInfo)
    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(coords => {
            setLatitude(coords.coords.latitude);
            setLongitude(coords.coords.longitude);
        });
    }, []);
    
    const sellAddFucn = async (e) => {
        e.preventDefault();
        
        if (!e.target[4].files[0] || !e.target[6].files[0] || !e.target[7].files[0] || !e.target[8].files[0] || !e.target[9].files[0]) {
            alert('Please enter thumbnail and multiple images');
        } else {

            const date = new Date();

            const addInfo = {
                category: e.target[0].value,
                title: e.target[1].value,
                description: e.target[2].value,
                price: e.target[3].value,
                thumbnail: imageLink,
                images: imagesLinks,
                date: date.getTime(),
                latitude,
                longitude
            };

            try {
                await addDateForAdds(addInfo, res.userId);
                e.target[0].value = '';
                e.target[1].value = '';
                e.target[2].value = '';
                setImageLink('');
                navigate('/');

            } catch (e) {
                console.log(e.message)
            };
        };

    };

    return (
        <div className="sell-container">
            <br />
            <div className='sell-form-container'>
                <form onSubmit={sellAddFucn}>
                    <div className='main-container'>
                        <div className='inputs-container'>

                            <label htmlFor="category-option">Category<span className='important-txt'>*</span>:</label>

                            <select required id='category-option'>
                                <option>Select category</option>
                                <option>Mobiles</option>
                                <option>Vehicles</option>
                                <option>Property For Sale</option>
                                <option>Property For Rent</option>
                                <option>Electronics & Home Appliances</option>
                                <option>Bikes</option>
                                <option>Business Indestrial & Agriculture</option>
                                <option>Services</option>
                                <option>Jobs</option>
                                <option>Animals</option>
                                <option>Furniture & Home Decor</option>
                                <option>Fashion & Beauty</option>
                                <option>Books, Sports & Hobbies</option>
                                <option>Kids</option>
                            </select>


                            <label htmlFor="titel-txt">Title<span className='important-txt'>*</span>:</label>
                            <input required id='titel-txt' type='text' />

                            <label htmlFor="description-txt">Description<span className='important-txt'>*</span>:</label>
                            <textarea maxLength={199} required id='description-txt' type='text' />

                            <label htmlFor="price-txt">Price<span className='important-txt'>*</span>:</label>
                            <input required id='price' type='number' />

                        </div>

                        <div className='image-container'>
                            <img src={imageLink} alt='Thumbnail image' />
                            <br />
                            <br />
                            <label htmlFor="thumbnail-image" style={{ textAlign: 'left' }}>Add thumbnail image<span className='important-txt'>*</span>:</label>
                            <label className='thumbnail-image-label' htmlFor="thumbnail-image">Click here</label>
                            <input onChange={async (e) => {
                                const imageUrl = await makeImageUrl(e.target.files[0]);
                                setImageLink(imageUrl);
                            }} id='thumbnail-image' type='file' accept='image/*' />
                        </div>
                    </div>

                    <br />
                    <h1 style={{ textAlign: 'center' }}>Add your location</h1>

                    {longitude &&
                        <MapForAddSell longitude={longitude} latitude={latitude} setLatitude={setLatitude} setLongitude={setLongitude} />
                    }

                    <br />

                    <h1 style={{ textAlign: 'center' }}>Add Multiple Images</h1>

                    <br />

                    <div className='add-multiple-images-conatiner'>


                        <div className='image-container'>
                            <img src={imagesLinks[0]} alt='First image' />
                            <br />
                            <br />
                            <label htmlFor="first-image" style={{ textAlign: 'left' }}>Add first image<span className='important-txt'>*</span>:</label>
                            <label className='first-image-label' htmlFor="first-image">Click here</label>
                            <input
                                onChange={async (e) => {
                                        const imageUrl = await makeImageUrl(e.target.files[0]);

                                    const imagess = [...imagesLinks];
                                    imagess[0] = imageUrl;
                                    setImagesLinks(imagess);
                                }}
                                id='first-image' type='file' />
                        </div>

                        <div className='image-container'>
                            <img src={imagesLinks[1]} alt='Second image' />
                            <br />
                            <br />
                            <label htmlFor="second-image" style={{ textAlign: 'left' }}>Add second image<span className='important-txt'>*</span>:</label>
                            <label className='second-image-label' htmlFor="second-image">Click here</label>
                            <input
                                onChange={async (e) => {
                                    const imageUrl = await makeImageUrl(e.target.files[0]);

                                    const imagess = [...imagesLinks];

                                    imagess[1] = imageUrl;

                                    setImagesLinks(imagess);
                                }}
                                id='second-image' type='file' />
                        </div>

                        <div className='image-container'>
                            <img src={imagesLinks[2]} alt='Third image' />
                            <br />
                            <br />
                            <label htmlFor="third-image" style={{ textAlign: 'left' }}>Add third image<span className='important-txt'>*</span>:</label>
                            <label className='third-image-label' htmlFor="third-image">Click here</label>
                            <input
                                onChange={async (e) => {
                                    const imageUrl = await makeImageUrl(e.target.files[0]);

                                    const imagess = [...imagesLinks];

                                    imagess[2] = imageUrl;

                                    setImagesLinks(imagess);
                                }}
                                id='third-image' type='file' />
                        </div>

                        <div className='image-container'>
                            <img src={imagesLinks[3]} alt='Fourth image' />
                            <br />
                            <br />
                            <label htmlFor="fourth-image" style={{ textAlign: 'left' }}>Add fourth image<span className='important-txt'>*</span>:</label>
                            <label className='fourth-image-label' htmlFor="fourth-image">Click here</label>
                            <input
                                onChange={async (e) => {
                                    const imageUrl = await makeImageUrl(e.target.files[0]);

                                    const imagess = [...imagesLinks];

                                    imagess[3] = imageUrl;

                                    setImagesLinks(imagess);
                                }}
                                id='fourth-image' type='file' />
                        </div>

                    </div>


                    <br />
                    <button type='submit' className='submit-btn'>Add a sell</button>
                </form>

            </div>
            <br />
        </div>
    );
};

export default AddSellPost;