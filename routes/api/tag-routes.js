const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/api/products', (req, res) => {
  res.json(products);
});

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: { attributes: [] }, 
          attributes: ['product_name', 'price', 'stock'],
        },
      ],
    });

    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          through: { attributes: [] }, // This will skip the tag-product relation table data
          attributes: ['product_name', 'price', 'stock'],
        },
      ],
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {

  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tag[0]) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Tag updated successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const { Tag } = require('../models');

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
