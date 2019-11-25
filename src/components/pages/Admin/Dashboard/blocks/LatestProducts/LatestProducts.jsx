import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mockData from './data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestProducts = props => {
  const { className, ...rest } = props;

  const styles = useStyles();

  const [products] = useState(mockData);

  return (
    <Card
      {...rest}
      className={cls(styles.root, className)}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Последние изменения"
      />
      <Divider />
      <CardContent className={styles.content}>
        <List>
          {products.map((product, i) => (
            <ListItem
              divider={i < products.length - 1}
              key={product.id}
            >
              <ListItemAvatar>
                <img
                  alt="Product"
                  className={styles.image}
                  src={product.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={`Обновлено ${product.updatedAt}`}
              />
              <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={styles.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Смотреть все <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

LatestProducts.defaultProps = {
  className: undefined,
};

export default LatestProducts;
