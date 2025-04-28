import React, { useState, useEffect } from 'react'
import './dnd.css'

function Dnd() {
	const [columns, setColumns] = useState([
		"Column 1", "Column 2", "Column 3", "Column 4",
		"Column 5", "Column 6", "Column 7", "Column 8"
	])
	const [draggedItemIndex, setDraggedItemIndex] = useState(null);
	const [width, setWidth] = useState(Array(columns.length).fill(100));
	const [resizingIndex, setResizingIndex] = useState(null)
	const [startX, setStartX] = useState(0);
	const [startWidth, setStartWidth] = useState(0);


	const handleDragStart = (index) => {
		setDraggedItemIndex(index)
		console.log(`Dragged from: ${index}`)
	}

	const handleDragOver = (e) => {
		e.preventDefault();
	}

	const handleDrop = (index) => {
		const newColums = [...columns]
		const draggedItem = newColums[draggedItemIndex]

		newColums.splice(draggedItemIndex, 1)
		newColums.splice(index, 0, draggedItem)

		console.log(`Dragges at: ${index}`)

		setColumns(newColums);
		setDraggedItemIndex(null)
		
	}

	const handleMouseDown = (index, e) => {
		e.preventDefault();
		setResizingIndex(index)
		setStartX(e.clientX);
		setStartWidth(width[index]);
	}

	const handleMouseMove = (e) => {
		if (resizingIndex !== null) {
			const deltaX = e.clientX - startX;  // no * 0.01
			const newWidths = [...width];
			newWidths[resizingIndex] = Math.max(50, startWidth + deltaX); // assign to array
			setWidth(newWidths);
		}
	};
	

	const handleMouseUP =() => {
		setResizingIndex(null)
	}

	useEffect(()=> {
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUP)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUP)
		}
	})



	return (
		<div className='container'>
			{
				columns.map((col, index)=>(
					<div 
						key={index} 
						draggable
						onDragStart={()=> handleDragStart(index)}
						onDragOver={handleDragOver}
						onDrop={()=> handleDrop(index)}
						className='columns'
						style = {{width: `${width[index]}px`}}
					>
						{col}
						<div
							className='columnResize'
							onMouseDown={(e)=> handleMouseDown(index, e)}
						>

						</div>
					</div>
				))
			}
		</div>
	)
}

export default Dnd