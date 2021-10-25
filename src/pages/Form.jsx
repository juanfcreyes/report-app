import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/socket-context";
import Swal from "sweetalert2";

export const Form = () => {
	const { emit, on } = useContext(SocketContext);

	const [formValues, setFormValues] = useState({
		name: "",
		age: "",
		email: "",
		address: "",
	});

	const handleChange = (event) => {
		const { target } = event;
		setFormValues(() => ({ ...formValues, [target.name]: target.value }));
	};

	const sendMessage = (event) => {
		event.preventDefault();
		emit("requestReport", formValues);
		Swal.showLoading();
	};

	useEffect(() => {
		if (!on) {
			return;
		}
		on("respondReport", (payload) => {
			

			Swal.fire("Success!", "Your request has been processed", "success").then(() => {
				const blob = new Blob([payload], { type: "application/pdf" });
				const link = document.createElement("a");
				link.href = URL.createObjectURL(blob);
				link.download = "Report.pdf";
				document.body.append(link);
				link.click();
				link.remove();
        setTimeout(() => URL.revokeObjectURL(link.href), 7000);
			});
		});
	}, [on]);

	return (
		<form>
			<div className='form-group row mb-3'>
				<label className='col' htmlFor='name'>
					Name
				</label>
				<div className='col-sm-11'>
					<input className='form-control' name='name' onChange={handleChange}></input>
				</div>
			</div>
			<div className='form-group row mb-3'>
				<label className='col' htmlFor='age'>
					Age
				</label>
				<div className='col-sm-11'>
					<input className='form-control' name='age' onChange={handleChange}></input>
				</div>
			</div>
			<div className='form-group row mb-3'>
				<label className='col' htmlFor='email'>
					Email
				</label>
				<div className='col-sm-11'>
					<input className='form-control ' name='email' onChange={handleChange}></input>
				</div>
			</div>
			<div className='form-group row mb-3'>
				<label className='col' htmlFor='address'>
					Address
				</label>
				<div className='col-sm-11'>
					<input className='form-control' name='address' onChange={handleChange}></input>
				</div>
			</div>
			<div>
				<button className='btn btn-primary float-end' onClick={sendMessage}>
					Send Message
				</button>
			</div>
		</form>
	);
};
