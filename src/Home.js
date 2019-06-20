import React, { Component } from 'react';

// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from './redux/actions/main';

// component
import Result from './component/Result'

const available = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50];
const validCurrencyPattern = /^(Rp)?( )?((\d{1,3}){1}((\.\d{3})+(\,00)?)|\d+)$/;

class Home extends Component {

	onChangeInput = (e) =>{
		var value = e.target.value;   
		this.props.actionsMain.set_nominal(value)
	}

	validateCurrency() {
		return this.props.main.nominal.match(validCurrencyPattern);
	}

	removeCurrencyChars() {
		var val = this.props.main.nominal;
		if(val.includes('Rp') || val.includes('Rp ') || val.includes('Rp.') || val.includes('Rp. ') || val.includes('.')){
			val = val.replace(/Rp|Rp /g,'');
			val = val.replace(/\./g,'');
		}
		return parseInt(val);
	}

	keyPress = (e)=>{
		//check keyCode for enter is 13
		if(e.keyCode === 13){
			this.props.actionsMain.set_result(false)
			this.doParse();
		}
	}

	getFractions=(nom) =>{
		var fractions = [];
		// check the fractions from max to min by loop
		for (var i = 0; i < available.length; i++) {
			// get rest of nominal after modulus by max fraction value
			var rest = nom % available[i];
			
			// get count current fraction
			var count = (nom - rest) / available[i];

			// if has fraction, push the fraction to counted fractions
			if (count > 0){
			    fractions.push({ fraction: available[i], count: count });
			}

			// change nominal value to rest
			nom = rest;
		}   

		// Set result
		var result = {
			nominal : this.props.main.nominal,
			fraction: fractions,
			leftovers: nom
		}
		this.props.actionsMain.set_result(result)
		this.props.actionsMain.set_nominal('')
	}

	doParse=()=> {
		// if currency is valid format, clean currency and do parsing
		if (this.validateCurrency()) {
			this.props.actionsMain.set_error('')
			this.getFractions(this.removeCurrencyChars());
		}else{
			// set error message
			this.props.actionsMain.set_error("Wrong format! Please input with a valid input. (Example : 18215,18.215,Rp17500, Rp17.500,00 ,Rp 120.325)")
		}
	}

	render(){
		const {error,nominal} = this.props.main;

		return (
			<div className="main">
				<div className="container">
					<div className="title">
						{"fraction of numbers"}
					</div>
					<div className={`input ${(error) ? `wrong`:``}`}>
						{/* Input here */}
						<input className="input_nominal" placeholder="Input nominal here" value={nominal} onKeyDown={this.keyPress} onChange={this.onChangeInput}/>

						<div className={`fail ${(error) ? ``:`d-none`}`}>
							<img src={require('./assets/error.png')} alt=""/>
						</div>
					</div>
					<div className="error_msg">
						{error ? error : ''}
					</div> 

					{/* Result */}
					<Result {...this.props.main}/>
				</div>
				<div className="footer">
		          <img src={require('./assets/tokopedia.png')} alt="" />
		          <p>
		          	Copyrights &copy; 2019 - Monika Yuliana | Front End Web Developer
		          </p>
		        </div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return { main: state.main }
}

function mapDispatchToProps(dispatch) {
  return {
    actionsMain: bindActionCreators(mainActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);