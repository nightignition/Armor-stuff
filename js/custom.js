/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var dropdown = $('#attacker_level');
	var armor_val_input = $('#armor_input');
	var armor_val_output = $('.armor_output');
	var health_val_input = $('#health_input');
	var eh_val_output = $('.eh_output');

	initDropDown();
	initArmor();

	function initDropDown()
	{
		dropdown.append('<option value="83" selected>83</option>');
		for(var x = 82; x > 0; x--)
		{
			var opt = '<option value="' + x + '">' + x + '</option>';
			dropdown.append(opt);
		}
	}

	function initArmor()
	{
		armor_val_input.on('input', function()
		{
			showResult();
		});
		dropdown.on('change', function()
		{
			showResult();
		});
		health_val_input.on('input', function()
		{
			showResult();
		});
	}

	function showResult()
	{
		// DR% = Armor / (Armor + 400 + 85 * AttackLevel)

		var attacker_level = parseInt(dropdown.val());
		var armor = parseInt(armor_val_input.val());
		var reduction;
		var health = parseInt(health_val_input.val());
		if(armor_val_input.val())
		{
			reduction = (armor / (armor + 400 + (85 * (attacker_level + (4.5 * (attacker_level - 59)))) + (20 * (attacker_level - 80)))) * 100;
			var output_text = "Your damage reduction is " + reduction.toFixed(2) + "%";
			armor_val_output.text(output_text);
		}
		else
		{
			armor_val_output.text("");
		}
		if(health_val_input.val())
		{
			// Health / (1 - DR)
			var eh = (health / (1 - (reduction / 100)));
			console.log(eh);
			eh_val_output.text("Your effective health is: "+eh.toFixed(2));
		}
	}
});