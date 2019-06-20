import React from 'react';

class Result extends React.Component {
	render(){
		const {result}= this.props;
		return(
			<div className="result">
				{result ?
					<React.Fragment>
						<p className="text">Result:</p>
						<div id="result_content">
							<p>Your Input : <span>{result.nominal}</span></p>
							{(result.fraction !== '') ?
								<React.Fragment>
								<p>Fractions : </p>
								<ul>
									{(result.fraction.map((data,x) => (
										<li key={x}><span>{data.count} X {data.fraction}</span></li>
									)))}
									<li>Left : <span>{result.leftovers}</span> {(result.leftovers > 0) ? '(no available fractions)' : ''}</li>
								</ul>
								</React.Fragment>
								:
								<p>Left : <span>{result.leftovers}</span> {(result.leftovers > 0) ? '(no available fractions)' : ''}</p>
							}
						</div>
					</React.Fragment>
					:
					''
				}
			</div>
		);
	}
}

export default Result