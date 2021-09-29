import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react';

function App() {
  const [stripe, setStripe] = useState()
  useEffect(() => {
    loadStripe('pk_test_51IiNC5DRetoBK5HCNEhyXlT764GxxIKOauUBtorwn6hECdZ3RZCsMAs5iZkEh5HC5qDMgpoDAryhbWwXgRZxIYOd00kzfvkgLi').then(stripe => {
      setStripe(stripe)
    });
  },[])
  
  
  useEffect(() => {
    const myForm = document.querySelector('.my-form');
    myForm.addEventListener('submit', handleForm)

    return () => myForm.removeEventListener('submit', handleForm)
  })

  const handleForm = async (event) => {
    event.preventDefault();

    const accountResult = await stripe.createToken('account', {
      business_type: 'company',
      company: {
        name: document.querySelector('.inp-company-name').value,
      },
      tos_shown_and_accepted: true,
    });

      document.querySelector('#token-account').value = accountResult.token.id;
      console.log(accountResult.token.id)
  }

  return (
    <div classNameName="App">
      <form className="my-form">
        <label>
          <span>Business Name</span>
          <input className="inp-company-name"/>
        </label>
        
        <label>
          <span>Token account</span>
          <input name="token-account" id="token-account"/>
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
