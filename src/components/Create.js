import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Create extends Component
{
	constructor() {
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			errors    : [],
			nome  : '',
			cep : '',
			rua : '',
			cidade : '',
			uf : '',
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleInsertUser = this.handleInsertUser.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	//--- Insert new user in users state array by props method ---//
	handleInsertUser(e) {
		e.preventDefault()
		const data = {
			id 		  : Math.floor(Math.random() * 100),
			nome  : this.state.nome,
			cep : this.state.cep,
			rua : this.state.rua,
			cidade : this.state.cidade,
			uf : this.state.uf,
			
		}
		if( !this.checkValidation(data) ) {
			this.reset();
			this.props.updateState(data, 0);
			document.getElementById("closeAddModal").click();
			toastr.success('Novo usuário cadastrado com sucesso!', {position : 'top-right', heading: 'OK'});
		}
	}
	//--- Validate all input field ---//
    checkValidation(fields) {
    	var error = {};
    	if(fields.nome.length === 0) {
    		error.nome = ['Este campo é obrigatório!'];
    	}
    	if(fields.cep.length === 0) {
    		error.cep = ['Este campo é obrigatório!'];
    	}
    	
		this.setState({
			errors : error
		})
		if(fields.nome.length === 0 || fields.cep.length === 0 || fields.rua.length === 0 || fields.cidade.length === 0 ) {
			return true;
		} else {
			return false;
		}
    }
    //--- Reset all state variable while insert new user ---//
    reset() {
        this.setState(this.baseState);
    }
    //--- Check that any validation errors occure for input field ---//
	hasErrorFor(fieldName) {
		return !!this.state.errors[fieldName];
	}
	//--- Render error for specific validation fail input field ---//
	renderErrorFor(fieldName) {
    	if (this.hasErrorFor(fieldName)) {
	        return (
	        	<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
	        )
      	}
    }

    render() {
      return(
			<div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Novo usuário</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleInsertUser}>
			      		<div className="modal-body">
			          		<div className="form-group">
			            		<label htmlFor="nome" className="col-form-label">Nome:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('nome') ? 'is-invalid' : ''}`}
			            		 id="nome" name="nome" placeholder="Nome" onChange={this.handleInputFieldChange} value={this.state.nome}/>
			            		{this.renderErrorFor('nome')}
			         	 	</div>
							  
			          		<div className="form-group">
			            		<label htmlFor="cep" className="col-form-label">cep:</label>
			            		<input type="number" className={`form-control form-control-sm ${this.hasErrorFor('cep') ? 'is-invalid' : ''}`}
			            		 id="cep" name="cep" placeholder="cep" onChange={this.handleInputFieldChange} value={this.state.cep}/>
			            		{this.renderErrorFor('cep')}
			          		</div>

							  <div className="form-group">
			            		<label htmlFor="rua" className="col-form-label">Rua:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('rua') ? 'is-invalid' : ''}`}
			            		 id="rua" name="rua" placeholder="Rua" onChange={this.handleInputFieldChange} value={this.state.rua}/>
			            		{this.renderErrorFor('rua')}
			         	 	</div>

							  <div className="form-group">
			            		<label htmlFor="cidade" className="col-form-label">Cidade:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('cidade') ? 'is-invalid' : ''}`}
			            		 id="cidade" name="cidade" placeholder="Cidade" onChange={this.handleInputFieldChange} value={this.state.cidade}/>
			            		{this.renderErrorFor('cidade')}
			         	 	</div>

							  <div className="form-group">
			            		<label htmlFor="uf" className="col-form-label">UF:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('uf') ? 'is-invalid' : ''}`}
			            		 id="uf" name="uf" placeholder="UF" onChange={this.handleInputFieldChange} value={this.state.uf}/>
			            		{this.renderErrorFor('uf')}
			         	 	</div>
			          		
			      		</div>
			      		<div className="modal-footer">
			        		<button type="button" id="closeAddModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Save User</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Create