<?php
/* Copyright (C) 2022 SuperAdmin <maxime@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * \file    usernavhistory/class/actions_usernavhistory.class.php
 * \ingroup usernavhistory
 * \brief   Example hook overload.
 *
 * Put detailed description here.
 */

require_once __DIR__ . '/../backport/v19/core/class/commonhookactions.class.php';

/**
 * Class ActionsUserNavHistory
 */
class ActionsUserNavHistory extends \userNavHistory\RetroCompatCommonHookActions
{
	/**
	 * @var DoliDB Database handler.
	 */
	public $db;

	/**
	 * @var string Error code (or message)
	 */
	public $error = '';

	/**
	 * @var array Errors
	 */
	public $errors = array();


	/**
	 * @var array Hook results. Propagated to $this->results for later reuse
	 */
	public $results = array();

	/**
	 * @var string String displayed by executeHook() immediately after return
	 */
	public $resprints;


	/**
	 * Constructor
	 *
	 *  @param		DoliDB		$db      Database handler
	 */
	public function __construct($db)
	{
		$this->db = $db;
	}


	/**
	 * Execute action
	 *
	 * @param	array			$parameters		Array of parameters
	 * @param	CommonObject    $object         The object to process (an invoice if you are in invoice module, a propale in propale's module, etc...)
	 * @param	string			$action      	'add', 'update', 'view'
	 * @return	int         					<0 if KO,
	 *                           				=0 if OK but we want to process standard actions too,
	 *                            				>0 if OK and we want to replace standard actions.
	 */
	public function getNomUrl($parameters, &$object, &$action)
	{
		global $db, $langs, $conf, $user;

		$this->resprints = '';
		return 0;
	}
	/**
	 * Hook execution to record user navigation history.
	 *
	 * Intercepts the 'globalcard' context to save the current object view
	 * into the user's history log.
	 *
	 * @param array       $parameters  Hook context and arguments.
	 * @param object      $object      The current object being viewed.
	 * @param string      $action      The current action being performed.
	 * @param HookManager $hookmanager The hook manager instance.
	 * @return int Returns 0 on success (or no action), < 0 on error.
	 */
	public function doActions($parameters, &$object, &$action, $hookmanager)
	{
		global $conf, $user, $langs;

		$error = 0; // Error counter
		$aContext = explode(":", $parameters['context']);
		if (in_array('globalcard', $aContext) && !empty($object->element) && !empty($object->id)) {
			dol_include_once('usernavhistory/class/usernavhistory.class.php');
			$unh = new UserNavHistory($this->db);
			$res = $unh->addElementInUserHistory($user->id, $object->id, $unh->getElementType());

			if ($res < 0) {
				$this->error = $unh->errors;
			}

			return $res;
		}

		return 0;
	}
}
