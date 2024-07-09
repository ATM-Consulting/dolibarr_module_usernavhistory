import { expect } from '@playwright/test';
import {URL_TO_USE} from "./ConfigLocal.spec";

export async function checkModuleActivated(page) {
	await page.getByTitle('Configuration').click();
	await expect(page).toHaveTitle(/Configuration/);

	await page.getByText('Configuration - Modules/Applications' ).click();
	await expect(page).toHaveURL( /.*\/admin\/modules\.php.*/);

	await page.getByPlaceholder('Mot-clé').fill('HISTORIQUE NAVIGATION UTILISATEUR');
	await page.getByRole('button', { name: 'Rafraichir' }).click();

	// Vérifie la présence de l'élément
	const element = page.locator('span.info-box-title:has-text("Historique navigation utilisateur")');
	//  l'élément est visible
	await expect(element).toBeVisible();
	// Vérifiez le texte exact de l'élément
	await expect(element).toHaveText('Historique navigation utilisateur');

	// Verification si le module est activé
	// Vérifiez que l'élément contient la classe "fas fa-toggle-on"
	// Localisez l'élément spécifique
	const toggleElement = page.locator('a.reposition[href*="modUserNavHistory"][href*="modules.php"]');

	// Vérifiez que l'élément est visible
	await expect(toggleElement).toBeVisible();
	const spanElement = toggleElement.locator('span');
	await expect(spanElement).toHaveClass(/fas fa-toggle-on/);

	// Vérifiez que l'élément a la classe "font-status4"
	await expect(spanElement).toHaveClass(/font-status4/);

	// Vérifiez que le titre de l'élément est "Activé"
	await expect(spanElement).toHaveAttribute('title', 'Activé');
};
export async function checkUserLogged(page){
	await page.goto(URL_TO_USE + 'index.php/');
	const inputPassword = page.getByRole('textbox', {name: 'Mot de passe'});

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Identifiant/);

	const inputUsername = page.locator('#username');
	const inputUsername2 = page.locator('input.flat.input-icon-user.minwidth150');
	const inputUsername3 = page.locator('[name = \'username\']');
	const inputPassword2 = page.locator("#password");

	await page.getByPlaceholder('Identifiant').fill('admin');

	const password = page.getByPlaceholder('Mot de passe');
	await password.fill('admin');
	await password.press('Enter');

	// We must be loged in now
	await expect(page).toHaveTitle(/Accueil/);
};


