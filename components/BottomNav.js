/** @format */

import Button from '@mui/material/Button'
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

export default function BottomNav() {
	const router = useRouter();
	const [cartLen, setCartLen] = useState(0);

	useEffect(() => {
		var Cart = JSON.parse(localStorage.getItem("items"));
		if (Cart) {
			setCartLen(Cart.length);
		}
	});

	const data = [
		{
			link: "/",
			src: "/home512.png",
			checked: "/home512.png",
			name: "Home",
		},
		{
			link: "/create-post",
			src: "/plus512.png",
			checked: "/flash512r.png",
			name: "Add",
		},
		{
			link: "/cart",
			src: "/bell512.png",
			checked: "/bag512r.png",
			name: "Alert",
		},
		{
			link: "/account",
			src: "/user512.png",
			checked: "/user512r.png",
			name: "Account",
		},
	];

	return (
		<div className="bottonNav">
			{data.map(({ link, src, checked, name }, index) => {
				return (
					<div className="bottomButton" key={index}>
						<Button className="bBtn">
							<Link href={link}>
								<a>
									{name === "Cart" ? <section>{cartLen}</section> : ""}
									<img
										src={router.pathname === link ? checked : src}
										alt={link}
									/>
									<span> {name} </span>
								</a>
							</Link>
						</Button>
					</div>
				);
			})}
		</div>
	);
}
