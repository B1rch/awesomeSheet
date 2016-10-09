var nif = (function() {

  var data = {
    awesomeSheet: true,
    basics: {
      name: "Nif Amakir",
      race: "Elf",
      class: "Wizard",
      level: "6",
      size: "Medium",
      alignment: "Lawful Neutral",
      xp: "32,449",
      height: "6'0",
      weight: "136 lbs",
      age: "120",
      gender: "Male",
      speed: "30 ft, 6 sq",
      initiative: "3",
      hero_points: "",
      luck_points: ""
    },
    statistics: {
      stats: {
        str: {
          score: "8",
          temp: ""
        },
        dex: {
          score: "17",
          temp: ""
        },
        con: {
          score: "14",
          temp: ""
        },
        int: {
          score: "21",
          temp: "23"
        },
        wis: {
          score: "12",
          temp: ""
        },
        cha: {
          score: "10",
          temp: ""
        }
      },
      feats: "Alertness, Augment Summoning, Craft Wondrous Item, Greater Spell Focus (Conjuration), Scribe Scroll, Spell Focus (Conjuration)",
      traits: "Resilient",
      languages: "Celestial, Common, Draconic, Dwarven, Elven, Giant, Gnome, Goblin, Orc, Sylvan, Undercommon",
      special_abilities: "Arcane bond (Su), Bonus feats, Cantrips, Arcane schools, Teleportation sub school, Opposition arcane school, Elven Immunities (Ex), Elven Magic (Ex), Keen Senses (Ex), Low-Light Vision (Ex), Headband of Vast Intelligence skill (Use Magic Device), Linguistics Skill (Dwarven, Giant, Undercommon), Shift (Su), Summoner's Charm (Su), Weapon Familiarity (Ex)"
    },
    equipment: {
      gear: "Spell component pouch, Spellbook, Backpack, Flask of Oil (3), Pouch (belt), Sack, Candle, Flint and Steel, Tindertwig, Rations (5 days), Waterskin, Bedroll, Blanket, Bloodblock, Healer's Kik, Rope (silk), Mirror, Compass, Ink, Inkpen, Paper sheets, Case for maps/scrolls, Scroll Case, Combat trained horse, Viles of insect sap (15)",
      magic_gear: "Pearl of Power (1st Level)<br>Viles: Antitoxin (1), Holy Water (1)<br>Potions: Cure Light Wounds (1), Protection from Evil (1), Adjustable Disguise (1), Aid (1), Displacement (1)<br>Scrolls: Acid Pit (1), Summon Monster III (3), Invisibility (2), Create Pit (1), Web (3), Stinking Cloud (2), Grease (1), Mirror Image (3), Spiked Pit (4), Fly (5), Interposing Hand (1), Elemental Form 2 (1), Wall of Fire (1), Haste (1)",
      encumbrance: {
        light: "26 lbs or less",
        medium: "27–53 lbs",
        heavy: "54–80 lbs"
      },
      body_slots: {
        armor: "",
        belts: "",
        body: "",
        chest: "",
        eyes: "",
        feet: "",
        hands: "",
        head: "",
        headband: "Headband of Vast Intelligence +2",
        neck: "Amulet of Natural Armor +1",
        ring_left_hand: "Ring of Sustenance",
        ring_right_hand: "",
        shield: "",
        shoulders: "Cloak of Resistance +2",
        wrist: ""
      },
      wealth: {
        platinum: "",
        gold: "379",
        silver: "",
        copper: ""
      },
      consumable: [{
        item: "Wand of Lightning Bolt",
        current: "",
        total: "50",
        used: "47"
      }, {
        item: "Wand of Scorching Ray",
        current: "",
        total: "50",
        used: "36"
      }, {
        item: "Wand of Swift Girding",
        current: "",
        total: "50",
        used: "30"
      }, {
        item: "Wand of Carry Companion",
        current: "",
        total: "50",
        used: "40"
      }, {
        item: "Shift",
        current: "",
        total: "9",
        used: "2"
      }]
    },
    defense: {
      hp: {
        total: "42",
        temp: "",
        damage: "",
        non_lethal_damage: "",
        current: ""
      },
      ac: {
        misc: "",
        temp: "",
        armor: "",
        shield: "",
        deflect: "",
        dodge: "",
        natural: "1",
        size_bonus: "",
        check_penalty: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_dodge: true,
          ac_natural: true,
          size: true
        }
      },
      flat_footed: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_armor: true,
          ac_shield: true,
          ac_deflect: true,
          ac_natural: true,
          size: true
        }
      },
      touch: {
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          plus_ten: true,
          ac_deflect: true,
          ac_dodge: true,
          size: true
        }
      },
      ac_notes: "",
      fortitude: {
        base: "2",
        racial: "",
        resistance: "2",
        misc: "3",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: true,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false
        }
      },
      reflex: {
        base: "2",
        racial: "",
        resistance: "2",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false
        }
      },
      will: {
        base: "5",
        racial: "",
        resistance: "2",
        misc: "",
        temp: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false
        }
      },
      save_notes: "Immune to sleep effecrs, +2 against enchantment spells and effects"
    },
    offense: {
      base_attack: "3",
      cmb: {
        misc: "",
        temp: "",
        size: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          level: false,
          half_level: false
        }
      },
      cmd: {
        misc: "",
        temp: "",
        size: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          level: false,
          half_level: false,
          plus_ten: true
        }
      },
      melee_attack: {
        misc: "",
        temp: "",
        size: "",
        current: "",
        bonuses: {
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          level: false,
          half_level: false
        }
      },
      ranged_attack: {
        misc: "",
        temp: "",
        size: "",
        current: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          bab: true,
          level: false,
          half_level: false
        }
      },
      attack: {
        melee: [{
          weapon: "Dagger (Master Work)",
          attack: "3",
          damage: "1d6+1",
          critical: "19–20/x2"
        }],
        ranged: [{
          weapon: "Shortbow",
          attack: "6",
          damage: "1d6",
          critical: "x3",
          range: "60 ft",
          ammo: "50"
        }]
      },
      attack_notes: ""
    },
    skills: {
      spent_ranks: {
        include_custom: false,
        current: ""
      },
      acrobatics: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      appraise: {
        ranks: "2",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      bluff: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      climb: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      craft_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      craft_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      diplomacy: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      disable_device: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      disguise: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      escape_artist: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      fly: {
        ranks: "2",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      handle_animal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      heal: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      intimidate: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_arcana: {
        ranks: "3",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_dungeoneering: {
        ranks: "2",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_engineering: {
        ranks: "1",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_geography: {
        ranks: "1",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_history: {
        ranks: "1",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_local: {
        ranks: "1",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nature: {
        ranks: "1",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_nobility: {
        ranks: "1",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_planes: {
        ranks: "3",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      knowledge_religion: {
        ranks: "3",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      linguistics: {
        ranks: "3",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perception: {
        ranks: "6",
        misc: "4",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      perform_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_1: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      profession_2: {
        variant_name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      ride: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      sense_motive: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      sleight_of_hand: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      spellcraft: {
        ranks: "6",
        misc: "",
        current: "",
        bonuses: {
          class_skill: true,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      stealth: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: true,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      survival: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: true,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      swim: {
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: true,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: true
        }
      },
      use_magic_device: {
        ranks: "6",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: true,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      custom_1: {
        name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      custom_2: {
        name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      custom_3: {
        name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      custom_4: {
        name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      custom_5: {
        name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      custom_6: {
        name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      custom_7: {
        name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      },
      custom_8: {
        name: "",
        ranks: "",
        misc: "",
        current: "",
        bonuses: {
          class_skill: false,
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: false,
          wis_bonus: false,
          cha_bonus: false,
          level: false,
          half_level: false,
          check_penalty: false
        }
      }
    },
    spells: {
      concentration: {
        current: "",
        misc: "",
        temp: "",
        bonuses: {
          str_bonus: false,
          dex_bonus: false,
          con_bonus: false,
          int_bonus: true,
          wis_bonus: false,
          cha_bonus: false,
          level: true
        }
      },
      per_day: {
        level_0: "4",
        level_1: "5",
        level_2: "4",
        level_3: "3",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      dc: {
        level_0: "16",
        level_1: "17",
        level_2: "18",
        level_3: "19",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      known: {
        level_0: "",
        level_1: "",
        level_2: "",
        level_3: "",
        level_4: "",
        level_5: "",
        level_6: "",
        level_7: "",
        level_8: "",
        level_9: ""
      },
      book: [{
        level_0: [{
          name: "Bleed",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Erase",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Daze",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Disrupt Undead",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Touch of Fatigue",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Prestidigitation",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Light",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Ghost Sound",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Spark",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Acid Splash",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Mage Hand",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Flare",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Detect Magic",
          prepared: 1,
          active: false,
          cast: 0
        }, {
          name: "Detect Poison",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Dancing Lights",
          prepared: 1,
          active: false,
          cast: 0
        }, {
          name: "Mending",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Arcane Mark",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Message",
          prepared: 1,
          active: false,
          cast: 0
        }, {
          name: "Ray of Frost",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Read Magic",
          prepared: 1,
          active: false,
          cast: 0
        }, {
          name: "Open Close",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Resistance",
          prepared: 0,
          active: false,
          cast: 0
        }]
      }, {
        level_1: [{
          name: "Comprehend Languages",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Enlarge Person",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Feather Fall",
          prepared: 1,
          active: false,
          cast: 0
        }, {
          name: "Grease",
          prepared: 2,
          active: false,
          cast: 0
        }, {
          name: "Mage Armor",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Mount",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Obscuring Mist",
          prepared: 1,
          active: false,
          cast: 0
        }, {
          name: "Protection from Chaos",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Protection from Evil",
          prepared: 1,
          active: false,
          cast: 1
        }, {
          name: "Shield",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Summon Monster I",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Unseen Servant",
          prepared: 0,
          active: false,
          cast: 0
        }]
      }, {
        level_2: [{
          name: "Blur",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Create Pit",
          prepared: 2,
          active: false,
          cast: 0
        }, {
          name: "Flaming Sphere",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Glitterdust",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Invisibility",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Levitate",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Mirror Image",
          prepared: 1,
          active: false,
          cast: 0
        }, {
          name: "Resist Energy",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Stone Call",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Summon Monster II",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Web",
          prepared: 1,
          active: false,
          cast: 0
        }]
      }, {
        level_3: [{
          name: "Stinking Cloud",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Summon Monster III",
          prepared: 1,
          active: false,
          cast: 1
        }, {
          name: "Spiked Pit",
          prepared: 1,
          active: false,
          cast: 0
        }, {
          name: "Aqueous Orb",
          prepared: 0,
          active: false,
          cast: 0
        }, {
          name: "Fly",
          prepared: 1,
          active: false,
          cast: 0
        }, {
          name: "Sleet Storm",
          prepared: 0,
          active: false,
          cast: 0
        }]
      }, {
        level_4: []
      }, {
        level_5: []
      }, {
        level_6: []
      }, {
        level_7: []
      }, {
        level_8: []
      }, {
        level_9: []
      }]
    },
    notes: {
      character: [{
        note: "<strong>Resilient</strong> (+1 trait bonus on Fortitude saves)<br><strong>Arcane bond (Su)</strong> Rat Bower, +2 Fortitude save,<br><strong>Bonus feats</strong>,<br><strong>Cantrips</strong>,<br><strong>Arcane schools</strong> Conjuration,<br><strong>Teleportation sub school</strong>,<br><strong>Opposition arcane school</strong> Enchantment, Necromancy,<br><strong>Elven Immunities (Ex)</strong> +2 against enchantment spells and effects,<br><strong>Elven Magic (Ex)</strong> +2 caster level checks made to overcome SR. +2 Spellcraft check to identify properties of magic items,<br><strong>Keen Senses (Ex)</strong> +2 Perception checks,<br><strong>Low-Light Vision (Ex)</strong> See x2 as far as humans in low illumination,<br><strong>Headband of Vast Intelligence skill</strong> Use Magic Device,<br><strong>Linguistics Skill</strong> Dwarven, Giant, Undercommon,<br><strong>Shift (Su)</strong> Teleport 15 feet 9 times per day,<br><strong>Summoner's Charm (Su)</strong> +3 rounds duration for Conjuration (Summoning) spells,<br><strong>Weapon Familiarity (Ex)</strong> Proficient with longbows (including composite longbows), longswords, rapiers, and shortbows (including composite shortbows), treat weapon with \"elven\" in name as a martial weapon."
      }, {
        note: "Create wondrous item, Headband of Vast Intelligence +4 2/16 days (6,000gp allotted)."
      }, {
        note: "Mirror Images up 4"
      }],
      story: [{
        note: "Baron Turbine Blackshield, lord of Thornkeep <br>Five factions in Thornkeep: Three Daggers (the thives), Iron jaws, Hunters guild, The Order (deal in magic), The Goblins, The Blue Basilisks (the muscle)"
      }]
    }
  };

  // exposed methods
  return {
    data: data
  };

})();
