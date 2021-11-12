import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import { useForm } from 'react-hook-form';


const AjoutFilm = (props) => {

    const defaultValues = props.person || {};

    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm({
      defaultValues,
    });
  
    function onSubmit(data) {
      console.log('Le formulaire a été validé avec succès !', data);
    }
  
    const isEditForm = Object.keys(defaultValues).length > 0;
  

    return (
        <>
            <Logo/>
            <Navigation/>
            <hr className="menu"/>
                <h1 className="menuTitle">Ajoutez votre film favoris</h1>
                    <div class="form-container">
                        <form class="register-form" onSubmit={handleSubmit(onSubmit)} noValidate >
                            {/* Uncomment the next line to show the success message */}
                            {/* <div class="success-message">Success! Thank you for registering</div> */}
                            <Ajout
                type='text'
                label='Titre'
                placeholder='Titre'
                register={{ ...register('title', { required: true }) }}
            >
                {errors.title?.type === 'required' && <p className='error-red'>Ce champs est requis !</p>}
            </Ajout>
            <div>
            <select name="categories " className="categories" defaultValue='' {...register('category', { required: true })}>
                <option value="">Categories</option>
                <option value="Action">Action</option>
                <option value="Aventure">Aventure</option>
                <option value="science-fiction">Science-Fiction</option>
                <option value="Drame">Drame</option>
                <option value="Horreur">Horreur</option>
                <option value="Fantastique">Fantastique</option>
            </select>
            <div>
                {errors.category?.type === 'required' && <p className='error-red'>Ce champs est requis !</p>}
            </div>
            </div>
            
            <Ajout
                type='date'
                label='Date de sortie'
                placeholder=''
                register={{ ...register('release_date', { required: true }) }}
            >
                {errors.release_date?.type === 'required' && <p className='error-red'>Ce champs est requis !</p>}
            </Ajout>
            <div>
                <div>
                    <label>Description:</label>
                    <textarea type="text" name="Description" placeholder='Description' defaultValue='' {...register('description', { required: true })}/>
                </div>
                <div className='mt-1'>
                    {errors.description?.type === 'required' && <p className='text-red-500'>Ce champs est requis !</p>}
                </div>
            </div>
            <Ajout 
                type='text' 
                label='Acteur' 
                placeholder='ecrivez-ici' 
                register={{ ...register('actor', { required: true }) }}>
                    {errors.actor?.type === 'required' && <p className='error-red'>Ce champs est requis !</p>}
            </Ajout>

            <Ajout
                type='text'
                label='Film similaire'
                placeholder='Autre films ...'
                register={{ ...register('similar_movies', { required: true }) }}
            >
                {errors.similar_movies?.type === 'required' && <p className='error-red'>Ce champs est requis !</p>}
            </Ajout>

            <Ajout
                type='url'
                label='lien du poster'
                placeholder='https://'
                register={{ ...register('poster') }}
            ></Ajout>

            <button type='submit' className='favorite styled'>
                {isEditForm ? 'Modifier ce film' : 'Ajouter ce film'}
            </button>
            </form>
            </div>

            
        </>
    )
}

const Ajout = ({ label, type, placeholder, register, children }) => {
    return (
      <div >
        <label
          htmlFor={label}    
        >
          {label} :
        </label>
        <div>
          <input type={type} id={label} required placeholder={placeholder} {...register} />
          <div>{children}</div>
        </div>
      </div>
    );
  };

export default AjoutFilm
